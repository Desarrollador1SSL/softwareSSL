import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// --- IMPORTS VERIFICADOS SEGÚN TU ESTRUCTURA ---
import ProfileSelection from './components/ProfileSelection/ProfileSelection';
import LoginCliente from './components/LoginCliente/LoginCliente';
import PortalClientes from './components/PortalClientes/PortalClientes';
import RutaProtegida from './components/RutaProtegida/RutaProtegida';
import GenericPage from './components/GenericPage/GenericPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Pantalla de Selección (Inicio) */}
        <Route path="/" element={<ProfileSelection />} />
        
        {/* 2. Login */}
        <Route path="/login" element={<LoginCliente />} />

        {/* 3. Portal Cliente (Protegido) */}
        <Route path="/portal-cliente" element={
            <RutaProtegida>
               <PortalClientes />
            </RutaProtegida>
        }>
            {/* Rutas Hijas (Dummies) */}
            
            {/* Dashboard */}
            <Route index element={<GenericPage title="Dashboard Principal" code="1.0" />} />
            <Route path="dashboard" element={<GenericPage title="Dashboard Principal" code="1.0" />} />

            {/* Mensajería */}
            <Route path="mensajeria" element={<GenericPage title="Central de Mensajería" code="2.0" />} />

            {/* Cotización */}
            <Route path="cotizacion/solicitudes" element={<GenericPage title="Solicitudes de Pedido" code="3.1" />} />
            <Route path="cotizacion/cotizaciones" element={<GenericPage title="Cotizaciones" code="3.2" />} />
            <Route path="cotizacion/ordenes" element={<GenericPage title="Órdenes de Compra" code="3.3" />} />

            {/* Entregas */}
            <Route path="entregas/control-oc" element={<GenericPage title="Control de entrega por OC" code="4.1" />} />
            <Route path="entregas/modificaciones" element={<GenericPage title="Modificaciones OC" code="4.2" />} />
            <Route path="entregas/recepcion" element={<GenericPage title="Control recepción" code="4.3" />} />
            <Route path="entregas/incidentes" element={<GenericPage title="Incidentes de entrega" code="4.4" />} />

            {/* Pagos */}
            <Route path="pagos/estado" element={<GenericPage title="Estado de Pagos" code="5.1" />} />

            {/* Obras */}
            <Route path="obras/listado" element={<GenericPage title="Listado de Obras" code="6.1" />} />

            {/* Configuración */}
            <Route path="config/admin-obras" element={<GenericPage title="Admin Obras" code="7.1" />} />
            <Route path="config/admin-usuarios" element={<GenericPage title="Admin Usuarios" code="7.2" />} />
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;