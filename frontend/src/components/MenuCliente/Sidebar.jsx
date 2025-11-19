import React from 'react';
import { 
  FaHome, FaComments, FaFileInvoice, FaTruck, 
  FaMoneyBillWave, FaHardHat, FaCog, FaChevronRight, FaChevronLeft 
} from 'react-icons/fa';

function Sidebar({ isOpen, toggle }) {
  return (
    <aside className={`sidebar-container ${isOpen ? '' : 'collapsed'}`}>
      
      {/* Botón Toggle flotante */}
      <div className="toggle-btn" onClick={toggle}>
         {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
      </div>

      {/* Menú de Navegación */}
      {/* Agregamos un padding-top porque ya no hay header interno */}
      <ul className="sidebar-menu" style={{ paddingTop: '10px' }}>
        
        <li className="menu-item active">
          <FaHome className="menu-icon" />
          <span>Dashboard</span>
        </li>

        <li className="menu-item">
          <FaComments className="menu-icon" />
          <span>Central de Mensajería</span>
        </li>

        <li className="menu-item">
          <FaFileInvoice className="menu-icon" />
          <span>Cotización y Compra</span>
          <FaChevronRight className="menu-arrow" />
        </li>

        <li className="menu-item">
          <FaTruck className="menu-icon" />
          <span>Control de Entregas</span>
          <FaChevronRight className="menu-arrow" />
        </li>

        <li className="menu-item">
          <FaMoneyBillWave className="menu-icon" />
          <span>Pagos</span>
          <FaChevronRight className="menu-arrow" />
        </li>

        <li className="menu-item">
          <FaHardHat className="menu-icon" />
          <span>Control Total de Obras</span>
          <FaChevronRight className="menu-arrow" />
        </li>

        <li className="menu-item">
          <FaCog className="menu-icon" />
          <span>Configuración</span>
          <FaChevronRight className="menu-arrow" />
        </li>

      </ul>
    </aside>
  );
}

export default Sidebar;