import React from "react";
import { Navigate } from "react-router-dom";


//FUNCION QUE RECIBE EL PORTAL CLIENTE DESDE MAIN
function RutaProtegida({childre}){

    const TOKEN = localStorage.getItem('token');

    if(!TOKEN){
        return <Navigate to="/login" replace/>;

    }
    //EL TOKEN EXISTE, INGRESA A PORTAL CLIENTE
    return childre;
}

export default RutaProtegida;