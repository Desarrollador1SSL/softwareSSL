// LoginCliente.jsx
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa'; // Importamos íconos
import './loginCliente.css';
import logo from '../assets/icons/ssl-logo.png';

function LoginCliente() {
  // Estados para controlar los inputs
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Manejador de "submit" (por ahora solo previene el envío)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intento de login con:', { usuario, password });
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        
        {/* Encabezado */}
        <div className="login-header">
          <a href="#" className="back-arrow">←</a>
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

          {/* Botón de Iniciar Sesión */}
          <button type="submit" className="login-button">
            Iniciar Sesión
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