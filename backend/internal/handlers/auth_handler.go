package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/desarrollador1SSL/softwaressl/internal/database"
	"github.com/desarrollador1SSL/softwaressl/internal/models"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// ... (Configuración CORS y validación de método igual que antes) ...
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Leer JSON
	var req models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON malformado", http.StatusBadRequest)
		return
	}

	// 1. Buscar usuario y su ID (Necesitamos el ID para la tabla sessions)
	var userID int
	var dbHashPassword string

	// Seleccionamos ID y Password
	query := `SELECT id, password FROM ssldb.login WHERE "user" = $1`
	err = database.DB.QueryRow(query, req.Usuario).Scan(&userID, &dbHashPassword)

	if err == sql.ErrNoRows {
		http.Error(w, `{"error": "Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	} else if err != nil {
		log.Printf("Error DB: %v\n", err)
		http.Error(w, "Error interno", http.StatusInternalServerError)
		return
	}

	// 2. Verificar contraseña
	err = bcrypt.CompareHashAndPassword([]byte(dbHashPassword), []byte(req.Contrasena))
	if err != nil {
		http.Error(w, `{"error": "Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	}

	// 3. Crear la SESIÓN (Cumpliendo con Jefe y Experto)
	sessionID := uuid.New()                       // El token
	expiresAt := time.Now().Add(30 * time.Minute) // Temporabilidad (Jefe)

	// Metadatos (Experto): Aquí podrías guardar roles, permisos, etc.
	metadata := `{"rol": "cliente", "permisos": ["ver_dashboard"]}`

	insertSession := `INSERT INTO ssldb.sessions (id, user_id, expires_at, data) VALUES ($1, $2, $3, $4)`
	_, err = database.DB.Exec(insertSession, sessionID, userID, expiresAt, metadata)

	if err != nil {
		log.Printf("Error creando sesión: %v\n", err)
		http.Error(w, "Error al crear sesión", http.StatusInternalServerError)
		return
	}

	// 4. Responder con el Token (Session ID)
	resp := models.LoginResponse{
		Message: "Login exitoso",
		User:    req.Usuario,
		Token:   sessionID.String(),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
