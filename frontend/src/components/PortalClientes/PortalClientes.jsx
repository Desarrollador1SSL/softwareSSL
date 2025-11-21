import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import Sidebar from '../MenuCliente/MenuCliente';
import PortalHeader from '../HeaderCliente/HeaderCliente';

// Asegúrate que este import coincida con el nombre de tu archivo.
// En tu imagen se ve: PortalClientes.css
import './portalClientes.css'; 

function PortalClientes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getCurrentSection = () => {
    const pathParts = location.pathname.split('/');
    const path = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
    if (!path || path === 'portal-cliente') return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="dashboard-layout-vertical">
      <PortalHeader />
      <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        <main className="main-content">
          <div className="content-area">
            <div className="breadcrumb-bar">
              <div className="back-btn-circle" onClick={() => navigate(-1)}>
                 <FaChevronLeft />
              </div>
              <div className="breadcrumb-text">
                 <span>Inicio</span> / <strong>{getCurrentSection()}</strong>
              </div>
            </div>
            <div className="white-paper">
               {/* Aquí se dibujarán las GenericPage */}
               <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PortalClientes;