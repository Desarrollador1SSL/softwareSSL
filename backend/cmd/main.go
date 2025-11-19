package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/desarrollador1SSL/softwaressl/internal/database" // Importamos el paquete de base de datos
	"github.com/desarrollador1SSL/softwaressl/internal/router"
)

func main() {
	// 1. Inicializar la conexión a la Base de Datos
	database.InitDB()
	// Aseguramos cerrar la conexión al apagar el servidor (opcional pero buena práctica)
	defer database.DB.Close()

	// 2. Configurar Rutas
	r := router.NewRouter()

	fmt.Println("Servidor Go escuchando en http://localhost:8080")

	// 3. Arrancar Servidor
	log.Fatal(http.ListenAndServe(":8080", r))
}
