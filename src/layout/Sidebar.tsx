import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import { ROUTES } from '../shared/routes';
import styles from './Sidebar.module.css';

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
      <button className={styles.navOpenBtn} aria-label="open menu" onClick={toggleSidebar}>
        <span className={`${styles.line} ${styles.line1}`}></span>
        <span className={`${styles.line} ${styles.line2}`}></span>
        <span className={`${styles.line} ${styles.line3}`}></span>
      </button>

      <div className={`${styles.mobileNavbar} ${isOpen ? styles.active : ''}`} data-navbar>
        <div className={styles.wrapper}>
          <a href={ROUTES.home} className={styles.logo}>
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle" />
          </a>

          <button className={styles.navCloseBtn} aria-label="close menu" onClick={closeSidebar}>
            <IonIcon icon={closeOutline} />
          </button>
        </div>

        <ul className={styles.navbarList}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className={styles.navbarLink} onClick={closeSidebar}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`} data-overlay onClick={closeSidebar}></div>
    </>
  );
};

export default Sidebar;
