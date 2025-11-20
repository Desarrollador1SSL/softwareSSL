import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import Sidebar from './MenuCliente/Sidebar';
import PortalHeader from './HeaderCliente/PortalHeader';

// --- CORRECCIÓN IMPORTANTE: Nombre exacto del archivo (Mayúsculas/Minúsculas) ---
import './PortalClientes.css'; 

function PortalClientes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para obtener el título de la sección actual
  const getCurrentSection = () => {
    const pathParts = location.pathname.split('/');
    const path = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    
    if (!path || path === 'portal-cliente') return 'Dashboard';
    
    // Convierte "control-oc" a "Control Oc" (Estético)
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="dashboard-layout-vertical">
      {/* Header Superior */}
      <PortalHeader />

      <div className="dashboard-body">
        {/* Sidebar Izquierda */}
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

        {/* Contenido Derecha */}
        <main className="main-content">
          <div className="content-area">
            
            {/* Breadcrumbs Dinámico */}
            <div className="breadcrumb-bar">
              <div className="back-btn-circle" onClick={() => navigate(-1)}>
                 <FaChevronLeft />
              </div>
              <div className="breadcrumb-text">
                 <span>Inicio</span> / <strong>{getCurrentSection()}</strong>
              </div>
            </div>

            {/* Aquí se cargan las páginas (GenericPage) */}
            <div className="white-paper">
               <Outlet />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default PortalClientes;