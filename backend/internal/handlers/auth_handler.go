package handlers

import (
	"database/sql"
	"encoding/json"
	"log" // Usamos 'log' en lugar de 'fmt' para registros profesionales
	"net/http"
	"time"

	"github.com/desarrollador1SSL/softwaressl/internal/database"
	"github.com/desarrollador1SSL/softwaressl/internal/models"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Configuración CORS
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

	// 2. Leer JSON del Frontend
	var req models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON malformado", http.StatusBadRequest)
		return
	}

	// (LIMPIEZA: Eliminamos los fmt.Printf que mostraban usuario y contraseña)

	// 3. Buscar el usuario en la Base de Datos
	var dbHashPassword string
	query := `SELECT password FROM ssldb.login WHERE "user" = $1`

	err = database.DB.QueryRow(query, req.Usuario).Scan(&dbHashPassword)

	if err == sql.ErrNoRows {
		// Usuario no existe: Mensaje genérico por seguridad
		http.Error(w, `{"error": "Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	} else if err != nil {
		// Error técnico: Lo registramos en el servidor con fecha/hora
		log.Printf("Error al consultar BD para usuario %s: %v\n", req.Usuario, err)
		http.Error(w, "Error interno del servidor", http.StatusInternalServerError)
		return
	}

	// 4. Verificar la contraseña
	err = bcrypt.CompareHashAndPassword([]byte(dbHashPassword), []byte(req.Contrasena))
	if err != nil {
		// Contraseña mal: Mensaje genérico por seguridad
		http.Error(w, `{"error": "Credenciales inválidas"}`, http.StatusUnauthorized)
		return
	}

	// 5. Generar nuevo Token y Actualizar Fecha
	newToken := uuid.New().String()
	fechaActual := time.Now()

	updateQuery := `UPDATE ssldb.login SET token = $1, fechaingreso = $2 WHERE "user" = $3`
	_, err = database.DB.Exec(updateQuery, newToken, fechaActual, req.Usuario)
	if err != nil {
		log.Printf("Error al actualizar token para usuario %s: %v\n", req.Usuario, err)
		http.Error(w, "Error interno del servidor", http.StatusInternalServerError)
		return
	}

	// 6. Responder al Frontend con éxito
	resp := models.LoginResponse{
		Message: "Login exitoso",
		User:    req.Usuario,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
