import React from 'react';
import { IonIcon } from '@ionic/react';
import '../App.css';
import { bagHandleOutline, personOutline, searchOutline, starOutline } from 'ionicons/icons';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';
import { getRoute } from '../shared/routes';

interface HeaderProps {
  onSearch: (term: string) => void;
  cartCount: number;
  wishlistCount: number;
  totalPrice: number;
}

interface LinksNavbar {
  link: boolean;
  className: string;
  text: string;
  href: string;
}

const linksNavbar: LinksNavbar[] = [
  {
    link: true,
    className: "navbar-link has-after",
    text: "Inicio",
    href: getRoute('home')
  },
  {
    link: false,
    className: "navbar-link has-after",
    text: "Nosotros",
    href: getRoute('aboutUs')
  },
  {
    link: false,
    className: "navbar-link has-after",
    text: "Productos",
    href: getRoute('shop')
  },
  {
    link: false,
    className: "navbar-link has-after",
    text: "Contáctanos",
    href: getRoute('contact')
  }
];

const formatPrice = (price: number): string => {
  return `s/.${(price ?? 0).toFixed(2)}`;
};

const renderNavItem = (item: LinksNavbar, index: number) => {
  if (item.link) {
    return (
      <li key={index}>
        <Link to={item.href} className={item.className}>{item.text}</Link>
      </li>
    );
  } else {
    return (
      <li key={index}>
        <a href={item.href} className={item.className}>{item.text}</a>
      </li>
    );
  }
};

const Header: React.FC<HeaderProps> = ({ onSearch, cartCount, wishlistCount, totalPrice }) => {
 
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

          <Link to={getRoute('home')} className="logo">
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
            <Link to={getRoute('summary')} className="header-action-btn" aria-label="cart item">
              <data className="btn-text" value={cartCount}>
                {formatPrice(totalPrice)}
              </data>
              <IonIcon icon={bagHandleOutline} aria-hidden="true"></IonIcon>
              <span className="btn-badge-cart">{cartCount}</span>
            </Link>
            </button>
          </div>

          <nav className="navbar">
            <ul className="navbar-list">
              {linksNavbar.map((item, index) => renderNavItem(item, index))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
