package database

import (
	"database/sql"
	"fmt"
	"log"
	"os" // Necesario para leer variables de entorno

	"github.com/joho/godotenv" // Importamos la librería
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	// 1. Cargar el archivo .env
	// Intentamos cargarlo, pero no morimos si falla (útil para producción donde no hay archivo .env sino variables de sistema)
	err := godotenv.Load()
	if err != nil {
		log.Println("Nota: No se encontró archivo .env, usando variables de entorno del sistema")
	}

	// 2. Leer las variables
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	// Verificación simple
	if host == "" || user == "" {
		log.Fatal("Error: Faltan variables de entorno para la base de datos")
	}

	// 3. Construir la conexión
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		host, port, user, password, dbname)

	// 4. Abrir conexión
	DB, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal("Error abriendo la conexión a la BD: ", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Error conectando (Ping) a la BD: ", err)
	}

	fmt.Println("¡Conexión a PostgreSQL exitosa!")
}
