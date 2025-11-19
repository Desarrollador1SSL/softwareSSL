package router

import (
	"fmt"
	"net/http"

	"github.com/desarrollador1SSL/softwaressl/internal/middleware"

	// ¡IMPORTANTE! Importamos nuestros manejadores (handlers)
	// que definiremos en el siguiente paso.
	// (Recuerda cambiar "softwaressl" por el nombre de tu módulo)
	"github.com/desarrollador1SSL/softwaressl/internal/handlers"
)

// NewRouter crea y configura el enrutador principal de la aplicación.
func NewRouter() http.Handler {
	// Usamos http.NewServeMux() en lugar del manejador por defecto
	// para tener más control.
	mux := http.NewServeMux()

	// (Paso 1: Definir la ruta)
	// Aquí conectamos la URL "/api/login" con la función "LoginHandler"
	// que vivirá en nuestro paquete 'handlers'.
	mux.HandleFunc("/api/login", handlers.LoginHandler)

	// (Paso 2: Registrar más rutas a futuro)
	// mux.HandleFunc("/api/users", handlers.GetUsersHandler)
	// mux.HandleFunc("/api/inventory", handlers.GetInventoryHandler)

	// Ruta Privada (Protegida por el Middleware)
	// Envolvemos el handler con nuestro middleware
	mux.HandleFunc("/api/portal", middleware.AuthMiddleware(portalHandler))

	return mux
}

// Handler de prueba para el portal (luego lo moverás a handlers/)
func portalHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, `{"message": "¡Bienvenido al Portal Seguro! Tu sesión ha sido renovada."}`)
}
