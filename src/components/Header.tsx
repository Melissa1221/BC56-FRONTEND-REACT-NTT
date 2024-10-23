import React from 'react';
import { IonIcon } from '@ionic/react';
import '../App.css';
import { bagHandleOutline, personOutline, searchOutline, starOutline } from 'ionicons/icons';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (term: string) => void;
  cartCount: number;
  wishlistCount: number;
  totalPrice: number;
}

const Header: React.FC<HeaderProps> = ({ onSearch,  cartCount, wishlistCount, totalPrice }) => {
 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm); 
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
         <Sidebar/>

          <div className="input-wrapper">
            <input 
              type="search" 
              name="search" 
              placeholder="Buscar productos" 
              className="search-field" 
              onChange={handleSearch}  
            />
            <button className="search-submit" aria-label="search">
              <IonIcon icon={searchOutline} aria-hidden="true"></IonIcon>
            </button>
          </div>

          <Link to="/" className="logo">
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle, una tienda de ecommerce" />
          </Link>

          <div className="header-actions">
            <button className="header-action-btn" aria-label="user">
              <IonIcon icon={personOutline} aria-hidden="true"></IonIcon>
            </button>
            <button className="header-action-btn" aria-label="favourite item">
              <IonIcon icon={starOutline} aria-hidden="true"></IonIcon>
              <span className="btn-badge-star">{wishlistCount}</span>
            </button>
            <button>
            <Link to="/summary" className="header-action-btn" aria-label="cart item">
              <data className="btn-text" value={cartCount}>
                s/.{(totalPrice ?? 0).toFixed(2)}
              </data>
              <IonIcon icon={bagHandleOutline} aria-hidden="true"></IonIcon>
              <span className="btn-badge-cart">{cartCount}</span>
            </Link>
            </button>
          </div>

          <nav className="navbar">
            <ul className="navbar-list">
              <li><Link to="/" className="navbar-link has-after">Inicio</Link></li>
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
