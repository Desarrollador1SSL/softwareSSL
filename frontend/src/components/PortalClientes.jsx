import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Sidebar from './MenuCliente/Sidebar';
import PortalHeader from './HeaderCliente/PortalHeader';
import './PortalClientes.css'; 

function PortalClientes() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout-vertical">
      
      {/* 1. HEADER SUPERIOR (Ocupa todo el ancho) */}
      <PortalHeader />

      {/* 2. CUERPO (Sidebar a la izq + Contenido a la derecha) */}
      <div className="dashboard-body">
        
        <Sidebar 
          isOpen={isSidebarOpen} 
          toggle={toggleSidebar} 
        />

        <main className="main-content">
          <div className="content-area">
            {/* Breadcrumbs */}
            <div className="breadcrumb-bar">
              <div className="back-btn-circle" onClick={() => navigate(-1)}>
                 <FaChevronLeft />
              </div>
              <div className="breadcrumb-text">
                 <span>Inicio</span> / <strong>Dashboard</strong>
              </div>
            </div>

            {/* Contenido */}
            <div className="white-paper">
               <h2 style={{color: '#ddd', textAlign:'center', marginTop: '100px'}}>
                  Contenido del Dashboard próximamente...
               </h2>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default PortalClientes;