package main // nombre del paquete

import "fmt" // importar dependencias

func sum(a int, b int) int {
	return a + b
}

func main() { // función inicio requerida

	a := 1
	b := 2

	r := sum(a, b)
	fmt.Printf("%v + %v = %v\n", a, b, r)
}
