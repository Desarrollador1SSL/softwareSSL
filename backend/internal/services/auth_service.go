package services

import (
	"database/sql"
	"errors"
	"log"
	"time"

	"github.com/desarrollador1SSL/softwaressl/internal/database"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// LoginService se encarga de toda la lógica de iniciar sesión.
// Recibe usuario y contraseña, y devuelve el token (sessionID) o un error.
func LoginService(usuario string, contrasena string) (string, error) {
	// 1. Buscar usuario y su ID
	var userID int
	var dbHashPassword string

	// Usamos database.DB que ya inicializaste en main.go
	query := `SELECT id, password FROM ssldb.login WHERE "user" = $1`
	err := database.DB.QueryRow(query, usuario).Scan(&userID, &dbHashPassword)

	if err == sql.ErrNoRows {
		return "", errors.New("credenciales inválidas")
	} else if err != nil {
		log.Printf("Error DB: %v\n", err)
		return "", errors.New("error interno del servidor")
	}

	// 2. Verificar contraseña
	err = bcrypt.CompareHashAndPassword([]byte(dbHashPassword), []byte(contrasena))
	if err != nil {
		return "", errors.New("credenciales inválidas")
	}

	// 3. Crear la SESIÓN
	sessionID := uuid.New()
	expiresAt := time.Now().Add(30 * time.Minute)

	// NOTA: Aquí es donde en el futuro agregaremos lógica para roles (Cliente, Admin, etc.)
	metadata := `{"rol": "cliente", "permisos": ["ver_dashboard"]}`

	insertSession := `INSERT INTO ssldb.sessions (id, user_id, expires_at, data) VALUES ($1, $2, $3, $4)`
	_, err = database.DB.Exec(insertSession, sessionID, userID, expiresAt, metadata)

	if err != nil {
		log.Printf("Error creando sesión: %v\n", err)
		return "", errors.New("error al crear sesión")
	}

	// Devolvemos el token como string
	return sessionID.String(), nil
}
