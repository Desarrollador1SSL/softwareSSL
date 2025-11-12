import React from 'react';
import './index.css'

//ENRUTAMIENTO
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//RUTAS/VISTAS
//import App from './App'
import ProfileSelection from './ProfileSelection/ProfileSelection'
import LoginCliente from './components/LoginCliente'

const router =createBrowserRouter([
  {
    path: "/",
    element: <ProfileSelection/>
  },
  {
    path: "/login",
    element: <LoginCliente/>
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
