/*
Para ejecutar este archivo hay que:
1. Abrir la terminal
2. Llegar a la carpeta 'backend': cd backend
3. Ejecuta el archivo: go run main.go
*/

package main

import (
	"encoding/json" // Paquete para manejar JSON
	"fmt"           // Paquete para imprimir en consola
	"log"           // Paquete para logging de errores
	"net/http"      // Paquete para crear el servidor web
)

// (Punto 1: El "molde" para el JSON que esperamos de React)
// Las etiquetas `json:"..."` le dicen a Go cómo se llaman
// los campos en el JSON que llega.
type LoginRequest struct {
	Usuario    string `json:"usuario"`
	Contrasena string `json:"password"`
}

// (Punto 2: El "molde" para el JSON que enviaremos de vuelta a React)
type LoginResponse struct {
	Message string `json:"message"`
	User    string `json:"user"`
}

// (Punto 3: El "manejador" de la ruta /api/login)
// Esta es la función que se ejecuta CADA VEZ que
// React llama a http://localhost:8080/api/login
func loginHandler(w http.ResponseWriter, r *http.Request) {

	// (Paso A: Configurar CORS - ¡CRUCIAL!)
	// Esto le da "permiso" a tu React (en localhost:5173)
	// para hablar con este servidor (en localhost:8080).
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// El navegador enviará una petición "OPTIONS" antes que el POST.
	// Respondemos "OK" para darle permiso.
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// (Paso B: Solo aceptar peticiones POST)
	if r.Method != "POST" {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// (Paso C: Decodificar el JSON de React)
	var req LoginRequest // Creamos un "molde" vacío

	// Leemos el JSON del cuerpo (body) de la petición
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		// Si el JSON está malformado, enviamos un error
		http.Error(w, "JSON malformado", http.StatusBadRequest)
		return
	}

	// (Paso D: prueba de conexion)
	// Imprimimos en consola para confirmar que los datos llegaron
	fmt.Printf("Intento de login recibido para el usuario: %s\n", req.Usuario)
	fmt.Printf("Intento de login recibido para la pass: %s\n", req.Contrasena)

	// (Paso E: Lógica de BD Futura)
	//
	// AQUÍ ES DONDE, EN EL FUTURO, harías la consulta a la BD:
	// err = database.CheckUser(req.Usuario, req.Contrasena)
	// if err != nil {
	//   http.Error(w, "Usuario o contraseña inválidos", http.StatusUnauthorized)
	//   return
	// }
	//
	// (Fin de la lógica futura)

	// (Paso F: Enviar respuesta de ÉXITO a React)
	// Creamos la respuesta que enviaremos de vuelta
	resp := LoginResponse{
		Message: "Login recibido exitosamente por el backend de Go",
		User:    req.Usuario,
	}

	w.Header().Set("Content-Type", "application/json") // Decimos que respondemos con JSON
	w.WriteHeader(http.StatusOK)                       // Decimos que todo salió "OK" (código 200)
	json.NewEncoder(w).Encode(resp)                    // Enviamos el JSON de respuesta

}

// (Punto 4: La función principal que arranca el servidor)
func main() {
	// Le decimos a Go que la función 'loginHandler' debe
	// manejar todas las peticiones a la ruta "/api/login"
	http.HandleFunc("/api/login", loginHandler)

	// Imprimimos en la consola de Go para saber que está listo
	fmt.Println("Servidor Go escuchando en http://localhost:8080/api/login")

	// Arrancamos el servidor en el puerto 8080
	// log.Fatal se ejecutará si hay un error (ej. el puerto ya está en uso)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
