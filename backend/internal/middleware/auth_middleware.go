package middleware

import (
	"database/sql"
	"net/http"
	"strings"
	"time"

	"github.com/desarrollador1SSL/softwaressl/internal/database"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// ... (CORS igual que antes) ...
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Token requerido", http.StatusUnauthorized)
			return
		}
		token := strings.TrimPrefix(authHeader, "Bearer ")

		// 1. Validar Sesión en tabla SESSIONS
		// El jefe dijo: "base de datos ve y dice si ese token está vigente todavía"
		var sessionID string

		// Buscamos por ID del token Y que la fecha expire sea futuro
		query := `SELECT id FROM ssldb.sessions WHERE id = $1 AND expires_at > NOW()`

		err := database.DB.QueryRow(query, token).Scan(&sessionID)

		if err == sql.ErrNoRows {
			// El jefe dijo: "devuelve al front token vencido"
			http.Error(w, `{"error": "Token vencido o inválido"}`, http.StatusUnauthorized)
			return
		} else if err != nil {
			http.Error(w, "Error de servidor", http.StatusInternalServerError)
			return
		}

		// 2. Renovar Sesión (Sliding Expiration)
		// El jefe dijo: "Si está vigente, lo renueva por X tiempo más"
		newExpiration := time.Now().Add(30 * time.Minute)
		updateQuery := `UPDATE ssldb.sessions SET expires_at = $1 WHERE id = $2`

		// Lo hacemos en una goroutine (segundo plano) para no frenar la respuesta
		go func() {
			database.DB.Exec(updateQuery, newExpiration, token)
		}()

		next(w, r)
	}
}
