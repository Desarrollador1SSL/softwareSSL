import React from 'react';
import './index.css'

//ENRUTAMIENTO
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//RUTAS/VISTAS
//import App from './App'
import ProfileSelection from './components/ProfileSelection/ProfileSelection'
import LoginCliente from './components/LoginCliente'
import PortalCliente from './components/PortalClientes'
import RutaProtegida from './components/RutaProtegida'

const router =createBrowserRouter([
  {
    path: "/",
    element: <ProfileSelection/>
  },
  {
    path: "/login",
    element: <LoginCliente/>
  },
  {
    path: "/portal-cliente",
    element:(
      
      <PortalCliente />
      
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App - ProfileSelection/> */}
//     <LoginCliente />
//   </StrictMode>,
// )
