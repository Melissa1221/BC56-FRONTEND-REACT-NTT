// src/components/Header.tsx
import React from 'react';
import { IonIcon } from '@ionic/react';
import '../App.css';
import { bagHandleOutline, personOutline, searchOutline, starOutline } from 'ionicons/icons';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  // Función que maneja el cambio en el input de búsqueda
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);  // Pasamos el término de búsqueda a App
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <button className="nav-open-btn" aria-label="open menu" data-nav-toggler>
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>

          <div className="input-wrapper">
            <input 
              type="search" 
              name="search" 
              placeholder="Buscar productos" 
              className="search-field" 
              onChange={handleSearch}  // Detectamos los cambios en el input
            />
            <button className="search-submit" aria-label="search">
              <IonIcon icon={searchOutline} aria-hidden="true"></IonIcon>
            </button>
          </div>

          <a href="#" className="logo">
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle, una tienda de ecommerce" />
          </a>

          <div className="header-actions">
            <button className="header-action-btn" aria-label="user">
              <IonIcon icon={personOutline} aria-hidden="true"></IonIcon>
            </button>
            <button className="header-action-btn" aria-label="favourite item">
              <IonIcon icon={starOutline} aria-hidden="true"></IonIcon>
              <span className="btn-badge-star">0</span>
            </button>
            <button className="header-action-btn" aria-label="cart item">
              <data className="btn-text" value="0">s/.0.00</data>
              <IonIcon icon={bagHandleOutline} aria-hidden="true"></IonIcon>
              <span className="btn-badge-cart">0</span>
            </button>
          </div>

          <nav className="navbar">
            <ul className="navbar-list">
              <li><a href="#home" className="navbar-link has-after">Inicio</a></li>
              <li><a href="#aboutUs" className="navbar-link has-after">Nosotros</a></li>
              <li><a href="#shop" className="navbar-link has-after">Productos</a></li>
              <li><a href="#contact" className="navbar-link has-after">Contáctanos</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
