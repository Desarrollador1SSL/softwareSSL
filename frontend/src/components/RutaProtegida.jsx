import React from "react";
import { Navigate } from "react-router-dom";

// Corrección: el prop estándar de React se llama "children", no "childre"
function RutaProtegida({ children }) {

    // Corrección: Buscar 'authToken', que es como lo guardaste en el Login
    const TOKEN = localStorage.getItem('authToken');

    if (!TOKEN) {
        // Si no hay token, redirigir al login
        return <Navigate to="/login" replace />;
    }

    // Si el token existe, renderizar el contenido protegido (children)
    return children;
}

export default RutaProtegida;