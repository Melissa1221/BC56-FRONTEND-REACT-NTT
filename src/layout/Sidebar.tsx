import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import logoImage from '/assets/images/logo.png'; 

const Sidebar = () => {
  
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  
  const toggleNavbar = () => {
    setIsNavbarActive((prev) => !prev); 
  };

  const closeNavbar = () => {
    setIsNavbarActive(false); 
  };

  return (
    <>
      
      <button
        className="nav-open-btn"
        aria-label="open menu"
        onClick={toggleNavbar}
      >
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </button>

     
      <div className={`sidebar ${isNavbarActive ? 'active' : ''}`}>
        <div className={`mobile-navbar ${isNavbarActive ? 'active' : ''}`}>
          <div className="wrapper">
            <a href="#" className="logo">
              <img src={logoImage} width="179" height="26" alt="Glowing" />
            </a>
            <button
              className="nav-close-btn"
              aria-label="close menu"
              onClick={toggleNavbar} 
            >
              <IonIcon icon={closeOutline} aria-hidden="true" />
            </button>
          </div>
          <ul className="navbar-list">
            <li>
              <a href="#home" className="navbar-link has-after" onClick={closeNavbar}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#shop" className="navbar-link has-after" onClick={closeNavbar}>
                Productos
              </a>
            </li>
            <li>
              <a href="#contact" className="navbar-link has-after" onClick={closeNavbar}>
                Contáctanos
              </a>
            </li>
          </ul>
        </div>

       
        {isNavbarActive && (
          <div className="overlay active" onClick={toggleNavbar}></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
