package auth

// NO DEBE HABER LOGICA DE NEGOCIO AQUI
import (
	"encoding/json"
	"net/http"

	"github.com/desarrollador1SSL/softwaressl/internal/models"
	// Importamos nuestros servicios
	"github.com/desarrollador1SSL/softwaressl/internal/services"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// --- Configuración CORS (Igual que antes) ---
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

	// 1. Leer JSON
	var req models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON malformado", http.StatusBadRequest)
		return
	}

	// 2. Llamar al Servicio (Aquí delegamos la lógica pesada)
	token, err := services.LoginService(req.Usuario, req.Contrasena)

	if err != nil {
		// Si el servicio devuelve error, decidimos qué código HTTP enviar
		if err.Error() == "credenciales inválidas" {
			http.Error(w, `{"error": "Credenciales inválidas"}`, http.StatusUnauthorized)
		} else {
			http.Error(w, "Error interno", http.StatusInternalServerError)
		}
		return
	}

	// 3. Responder con éxito
	resp := models.LoginResponse{
		Message: "Login exitoso",
		User:    req.Usuario,
		Token:   token,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
