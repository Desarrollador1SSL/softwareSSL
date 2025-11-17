// LoginCliente.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // Importamos íconos
import './loginCliente.css';
import logo from '../assets/icons/ssl-logo.png';

function LoginCliente() {
  // Estados para controlar los inputs
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  //Estados para manejar la carga y los errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  // Manejador de "submit" (por ahora solo previene el envío)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Reiniciamos estados
    setIsLoading(true);
    setError(null);

    //URL API GOLANG
    const API_URL = 'http://localhost:8080/api/login'; 

    try {

      //usamos fetch para enviar la peticion POST
      const response = await fetch(API_URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password,
        }),
      });

      if (!response.ok){
        //se intenta leer el error go recibido 
        const errorData = await response.json();
        throw new Error(errorData.error || 'Usuario o contraseña incorrectos.');
      }

      
      const data = await response.json();

      //REDIRECCIONA SI LA API RESPONDE OK/200
      navigate('/portal-cliente');
      
      
    } catch (error) {
      
      console.error('Error en el login:', error);
      // Corrección: se usa 'error.message' en lugar de 'err.message'
      setError(error.message);

    } finally {

      setIsLoading(false);

    }

  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        
        {/* Encabezado */}
        <div className="login-header">
          {/* MODIFICACIÓN: Botón para volver atrás */}
          <button 
            type="button" 
            className="back-arrow" 
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }} // Asegura que herede estilos limpios
          >
            ←
          </button>

          <img src={logo} alt="SSL Logo" className="login-logo" />
          <h2>Sistema SSL v4.0</h2>
          <span className="portal-badge">Portal Cliente</span>
        </div>

        {/* Formulario de Login */}
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Campo Usuario */}
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                id="usuario" 
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                id="password" 
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Opciones (Recordarme / Olvidó contraseña) */}
          <div className="form-options">
            <div className="checkbox-group">
              <input type="checkbox" id="recordarme" />
              <label htmlFor="recordarme">Recordarme</label>
            </div>
            <a href="#" className="forgot-password">¿Olvidó su contraseña?</a>
          </div>

           {/* Mensaje de error visual (opcional, si quieres verlo en pantalla) */}
           {error && (
            <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          {/* Botón de Iniciar Sesión */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <div className="login-footer">
          <p>© 2025 Sea Shipping Line. Todos los derechos reservados</p>
        </div>

      </div>
    </div>
  );
}

export default LoginCliente;