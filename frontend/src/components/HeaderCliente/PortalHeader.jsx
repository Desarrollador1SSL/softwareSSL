import React from 'react';
import { FaCalendarAlt, FaQuestionCircle, FaBell, FaChevronDown } from 'react-icons/fa';
// Importamos el logo aquí
import logoImg from '../../assets/icons/ssl-logo.png'; 

function PortalHeader() {
  const fecha = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const fechaFormat = fecha.charAt(0).toUpperCase() + fecha.slice(1);

  return (
    <header className="top-navbar">
      
      {/* ZONA IZQUIERDA: LOGO Y MARCA */}
      <div className="navbar-brand-area">
         <img src={logoImg} alt="SSL Logo" className="navbar-logo" />
         <div className="navbar-title">
            <h3>SSL v4.0</h3>
            <span>Portal Cliente</span>
         </div>
      </div>

      {/* ZONA DERECHA: CONTROLES */}
      <div className="navbar-controls">
        
        <div className="header-date">
           {/* Icono calendario opcional, en tu imagen no sale, pero lo dejo por si acaso */}
           <span>📅 {fechaFormat}</span>
        </div>

        <div className="divider-vertical"></div>

        <button className="btn-help">
          <FaQuestionCircle /> Ayuda
        </button>

        <div className="notification-icon">
          <FaBell />
          <span className="badge">15</span>
        </div>

        <div className="user-info">
          <div className="avatar-circle">C</div>
          <span>Empresa Demo S.A.</span>
          <FaChevronDown size={10} style={{marginLeft: 5}}/>
        </div>

      </div>
    </header>
  );
}

export default PortalHeader;