import React, { useState } from 'react';
import { 
  FaHome, FaComments, FaFileInvoice, FaTruck, 
  FaMoneyBillWave, FaHardHat, FaCog, FaChevronRight, FaChevronLeft 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importamos hook de navegación

// --- IMPORTAMOS SU PROPIO CSS ---
import './menuCliente.css';

// ESTRUCTURA DEFINITIVA CON RUTAS
const MENU_ITEMS = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: <FaHome />, 
    path: '/portal-cliente/dashboard' 
  },
  { 
    id: 'mensajeria', 
    label: 'Central de Mensajería', 
    icon: <FaComments />, 
    path: '/portal-cliente/mensajeria' 
  },
  { 
    id: 'cotizacion', 
    label: 'Cotización y Compra', 
    icon: <FaFileInvoice />, 
    subItems: [
      { label: 'Solicitudes de Pedido', path: '/portal-cliente/cotizacion/solicitudes' },
      { label: 'Cotizaciones', path: '/portal-cliente/cotizacion/cotizaciones' },
      { label: 'Órdenes de Compra', path: '/portal-cliente/cotizacion/ordenes' }
    ]
  },
  { 
    id: 'entregas', 
    label: 'Control de Entregas', 
    icon: <FaTruck />, 
    subItems: [
      { label: 'Control de entrega por OC', path: '/portal-cliente/entregas/control-oc' },
      { label: 'Modificaciones OC', path: '/portal-cliente/entregas/modificaciones' },
      { label: 'Control recepción', path: '/portal-cliente/entregas/recepcion' },
      { label: 'Incidentes de entrega', path: '/portal-cliente/entregas/incidentes' }
    ]
  },
  { 
    id: 'pagos', 
    label: 'Pagos', 
    icon: <FaMoneyBillWave />, 
    subItems: [
      { label: 'Estado de pagos', path: '/portal-cliente/pagos/estado' }
    ]
  },
  { 
    id: 'obras', 
    label: 'Control Total de Obras', 
    icon: <FaHardHat />, 
    subItems: [
      { label: 'Listado de obras', path: '/portal-cliente/obras/listado' }
    ]
  },
  { 
    id: 'config', 
    label: 'Configuración', 
    icon: <FaCog />, 
    subItems: [
      { label: 'Administración de Obras', path: '/portal-cliente/config/admin-obras' },
      { label: 'Administración de usuarios', path: '/portal-cliente/config/admin-usuarios' }
    ]
  }
];

function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate(); // Hook para navegar
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Función para manejar clics
  const handleItemClick = (item) => {
    // 1. Si tiene submenú, abrimos/cerramos
    if (item.subItems && item.subItems.length > 0) {
        if (!isOpen) {
            toggle(); // Abrir sidebar si está cerrado
            setActiveSubmenu(item.id);
        } else {
            setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
        }
    } 
    // 2. Si NO tiene submenú, navegamos directamente
    else if (item.path) {
        navigate(item.path);
    }
  };

  return (
    <aside className={`sidebar-container ${isOpen ? '' : 'collapsed'}`}>
      
      <div className="toggle-btn" onClick={toggle}>
         {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
      </div>

      <ul className="sidebar-menu" style={{ paddingTop: '10px' }}>
        
        {MENU_ITEMS.map((item) => {
            const hasSubmenu = item.subItems && item.subItems.length > 0;
            const isExpanded = activeSubmenu === item.id;

            return (
              <React.Fragment key={item.id}>
                
                {/* ITEM PADRE */}
                <li 
                  className={`menu-item ${isExpanded ? 'active' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="menu-icon">{item.icon}</div>
                  <span>{item.label}</span>
                  
                  {hasSubmenu && (
                    <FaChevronRight 
                      className={`menu-arrow ${isExpanded ? 'open' : ''}`} 
                      size={12}
                    />
                  )}
                </li>

                {/* SUBMENÚ */}
                {hasSubmenu && (
                  <div className={`submenu-wrapper ${isExpanded ? 'open' : ''}`}>
                    <div className="submenu-inner">
                      <ul className="submenu">
                        {item.subItems.map((subItem, index) => (
                          <li 
                            key={index} 
                            className="submenu-item"
                            // Al hacer click en el subitem, navegamos
                            onClick={() => navigate(subItem.path)}
                          >
                            {subItem.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </React.Fragment>
            );
        })}

      </ul>
    </aside>
  );
}

export default Sidebar;