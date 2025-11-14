package models

// LoginRequest es el "molde" para el JSON que esperamos de React
// (Nota: 'L' mayúscula para que sea público)
type LoginRequest struct {
	Usuario    string `json:"usuario"`
	Contrasena string `json:"password"` // Esto ya está corregido de antes
}

// LoginResponse es el "molde" para el JSON que enviaremos de vuelta
// (Nota: 'L' mayúscula para que sea público)
type LoginResponse struct {
	Message string `json:"message"`
	User    string `json:"user"`
}
