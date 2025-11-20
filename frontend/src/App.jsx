import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- CORRECCIÓN DE RUTAS BASADA EN TU IMAGEN ---

// 1. ProfileSelection: Está en su propia carpeta dentro de components
import ProfileSelection from './components/ProfileSelection/ProfileSelection';

// 2. LoginCliente: Está suelto dentro de components
import LoginCliente from './components/LoginCliente';

// 3. PortalClientes: Está suelto dentro de components
import PortalClientes from './components/PortalClientes';

// 4. RutaProtegida: Está suelto dentro de components
import RutaProtegida from './components/RutaProtegida';

// 5. GenericPage: Está suelto dentro de components
import GenericPage from './components/GenericPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<ProfileSelection />} />
        <Route path="/login" element={<LoginCliente />} />

        {/* RUTAS DEL PORTAL CLIENTE */}
        <Route path="/portal-cliente" element={
            <RutaProtegida>
               <PortalClientes />
            </RutaProtegida>
        }>
            {/* 1. Dashboard (Ruta Index y ruta explícita) */}
            <Route index element={<GenericPage title="Dashboard Principal" code="1.0" />} />
            <Route path="dashboard" element={<GenericPage title="Dashboard Principal" code="1.0" />} />

            {/* 2. Mensajería */}
            <Route path="mensajeria" element={<GenericPage title="Central de Mensajería" code="2.0" />} />

            {/* 3. Cotización y Compra */}
            <Route path="cotizacion/solicitudes" element={<GenericPage title="Solicitudes de Pedido" code="3.1" />} />
            <Route path="cotizacion/cotizaciones" element={<GenericPage title="Cotizaciones" code="3.2" />} />
            <Route path="cotizacion/ordenes" element={<GenericPage title="Órdenes de Compra" code="3.3" />} />

            {/* 4. Control de Entregas */}
            <Route path="entregas/control-oc" element={<GenericPage title="Control de entrega por OC" code="4.1" />} />
            <Route path="entregas/modificaciones" element={<GenericPage title="Modificaciones OC" code="4.2" />} />
            <Route path="entregas/recepcion" element={<GenericPage title="Control recepción" code="4.3" />} />
            <Route path="entregas/incidentes" element={<GenericPage title="Incidentes de entrega" code="4.4" />} />

            {/* 5. Pagos */}
            <Route path="pagos/estado" element={<GenericPage title="Estado de Pagos" code="5.1" />} />

            {/* 6. Obras */}
            <Route path="obras/listado" element={<GenericPage title="Listado de Obras" code="6.1" />} />

            {/* 7. Configuración */}
            <Route path="config/admin-obras" element={<GenericPage title="Admin Obras" code="7.1" />} />
            <Route path="config/admin-usuarios" element={<GenericPage title="Admin Usuarios" code="7.2" />} />
        </Route>

        {/* Redirección si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;