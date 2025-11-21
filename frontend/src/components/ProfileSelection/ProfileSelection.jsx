import React from 'react';
import './profileSelection.css';
import { useNavigate } from 'react-router-dom';



//COMPONENTE SECUNDARIO PARA TARJETAS
function ProfileCard({ title, description, features, buttonText, onCardClick }) {
  return (
    <div className="profile-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button className="access-button" onClick={onCardClick}>
        {buttonText }
      </button>
    </div>
  );
}


//COMPONENTE PRINCIPAL
function ProfileSelection() {

  const navigate = useNavigate();

  //NAVEGACIÓN AL LOGIN
  const handleProfileSelect = (profileType) => {
    console.log("Perfil seleccionado:", profileType);
    navigate('/login');
  };



  return (

    <div>
        
      <header className="selection-header">
        <img src="/ssl-logo.png" alt="SSL Logo" />
        <span>Página Principal</span>
      </header>

        <main className="selection-main">
            <h2>Bienvenido al Sistema SSL v4.0</h2>
            <p>Seleccione su perfil para acceder al sistema</p>

            <div className="cards-wrapper">

                <ProfileCard 
                    title="Portal Cliente"
                    description="Acceso para empresas clientes"
                    features={[
                    "Seguimiento de solicitudes",
                    "Gestión de cotizaciones",
                    "Control de facturación"
                    ]}
                    buttonText="Acceder como Cliente"
                    onCardClick={() => handleProfileSelect('cliente')}
                />

                <ProfileCard 
                    title="Portal Proveedor"
                    description="Acceso para proveedores"
                    features={[
                    "Recepción de cotizaciones",
                    "Gestión de órdenes",
                    "Actualización de catálogos"
                    ]}
                    buttonText="Acceder como Proveedor"
                    onCardClick={() => handleProfileSelect('Proveedor')}
                />

                <ProfileCard 
                    title="Portal SSL"
                    description="Acceso administrativo"
                    features={[
                    "Gestión completa del sistema",
                    "Administración de usuarios",
                    "Reportes y análisis"
                    ]}
                    buttonText="Acceder como SSL"
                    onCardClick={() => handleProfileSelect('SSL')}
                />
            </div>
        </main>
    </div>
  );
}

export default ProfileSelection;