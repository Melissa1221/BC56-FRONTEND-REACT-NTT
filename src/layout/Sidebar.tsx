import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { ROUTES } from '../shared/routes';

interface NavItem {
  href: string;
  text: string;
}

const navItems: NavItem[] = [
  {
    href: ROUTES.home,
    text: 'Inicio'
  },
  {
    href: ROUTES.aboutUs,
    text: 'Nosotros'
  },
  {
    href: ROUTES.shop,
    text: 'Productos'
  },
  {
    href: ROUTES.contact,
    text: 'Contáctanos'
  }
];

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
          <a href={ROUTES.home} className="logo">
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle" />
          </a>

          <button className="nav-close-btn" aria-label="close menu" onClick={closeSidebar}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className="navbar-list">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="navbar-link" onClick={closeSidebar}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'active' : ''}`} data-overlay onClick={closeSidebar}></div>
    </>
  );
};

export default Sidebar;
