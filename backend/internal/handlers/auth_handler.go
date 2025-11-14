package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	// ¡IMPORTANTE! Importamos nuestros modelos (structs)
	// que definiremos en el siguiente paso.
	// (Recuerda cambiar "softwaressl" por el nombre de tu módulo)
	"github.com/desarrollador1SSL/softwaressl/internal/models"
)

// LoginHandler maneja la petición de login
// (Nota: El nombre empieza con 'L' mayúscula para que sea público
// y 'router' pueda importarlo).
func LoginHandler(w http.ResponseWriter, r *http.Request) {

	// (Paso A: Configurar CORS)
	// (Más adelante, esto se moverá a un "middleware" centralizado)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// (Paso B: Solo aceptar POST)
	if r.Method != "POST" {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// (Paso C: Decodificar el JSON usando el "molde")
	var req models.LoginRequest // Usamos el struct del paquete 'models'

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "JSON malformado", http.StatusBadRequest)
		return
	}

	// (Paso D: Prueba de conexión)
	fmt.Printf("Intento de login recibido para el usuario: %s\n", req.Usuario)
	fmt.Printf("Intento de login recibido para la pass: %s\n", req.Contrasena)

	// (Paso E: Futura Lógica de Negocio)
	// En lugar de hacer la lógica aquí, llamarías a un "servicio":
	// token, err := services.AuthService.Login(req.Usuario, req.Contrasena)
	// if err != nil {
	//    http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
	//    return
	// }

	// (Paso F: Enviar respuesta de ÉXITO)
	resp := models.LoginResponse{ // Usamos el struct del paquete 'models'
		Message: "Login recibido exitosamente por el backend de Go",
		User:    req.Usuario,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
