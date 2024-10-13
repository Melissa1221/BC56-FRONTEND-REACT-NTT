import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>

      <button className="nav-open-btn" aria-label="open menu" onClick={toggleSidebar}>
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </button>

      <div className={`mobile-navbar ${isOpen ? 'active' : ''}`} data-navbar>
        <div className="wrapper">
          <a href="#" className="logo">
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle" />
          </a>

          <button className="nav-close-btn" aria-label="close menu" onClick={closeSidebar}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className="navbar-list">
          <li><a href="#home" className="navbar-link" onClick={closeSidebar}>Inicio</a></li>
          <li><a href="#aboutUs" className="navbar-link" onClick={closeSidebar}>Nosotros</a></li>
          <li><a href="#shop" className="navbar-link" onClick={closeSidebar}>Productos</a></li>
          <li><a href="#contact" className="navbar-link" onClick={closeSidebar}>Contáctanos</a></li>
        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'active' : ''}`} data-overlay onClick={closeSidebar}></div>
    </>
  );
};

export default Sidebar;
