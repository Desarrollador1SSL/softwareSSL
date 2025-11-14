package main

import (
	"fmt"
	"log"
	"net/http"

	//Importacion del router que dirije el trafico
	"github.com/desarrollador1SSL/softwaressl/internal/router"
)

func main() {

	//Paso 1: obtener enrutador
	//creamos un nuevo enrutador llamando a la func
	//que se define en internal ->router->router.go
	r := router.NewRouter()

	fmt.Println("Servidor Go escuchando en http://localhost:8080")

	//Paso 2: iniciar el servidor
	//le decimos al servidor que use nuestro enrutador 'r'
	//y que con este manejaresmos las peticiones
	log.Fatal(http.ListenAndServe(":8080", r))

}
