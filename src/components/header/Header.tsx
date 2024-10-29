import React from 'react';
import { IonIcon } from '@ionic/react';
import { bagHandleOutline, personOutline, searchOutline, starOutline } from 'ionicons/icons';
import Sidebar from '../../layout/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { getRoute } from '../../shared/routes';
import { LinksNavbar, HeaderProps } from './header.domain';
import styles from './Header.module.css';
import { useUser } from '../../shared/context/UserContext';

const linksNavbar: LinksNavbar[] = [
  {
    link: true,
    className: styles.navbarLink,
    text: "Inicio",
    href: getRoute('home')
  },
  {
    link: false,
    className: styles.navbarLink,
    text: "Nosotros",
    href: getRoute('aboutUs')
  },
  {
    link: false,
    className: styles.navbarLink,
    text: "Productos",
    href: getRoute('shop')
  },
  {
    link: false,
    className: styles.navbarLink,
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
  const { firstName, lastName, userImage, logout } = useUser(); 
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm); 
  };

  const handleLogout = () => {
    logout();
    navigate(getRoute('login')); 
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.inputWrapper}>
            <input 
              type="search" 
              name="search" 
              placeholder="Buscar productos" 
              className={styles.searchField} 
              onChange={handleSearch}  
            />
            <button className={styles.searchSubmit} aria-label="search">
              <IonIcon icon={searchOutline} aria-hidden="true"></IonIcon>
            </button>
          </div>
         
          {firstName && lastName && (
            <p className={styles.welcomeMessage}>Bienvenido: {firstName} {lastName}</p>
          )}

          <Link to={getRoute('home')} className={styles.logo}>
            <img src="./assets/images/logo.png" width="179" height="26" alt="Logo de Borcelle, una tienda de ecommerce" />
          </Link>

          <div className={styles.headerActions}>
            <button className={styles.headerActionBtn} aria-label="user">
              {userImage ? (
                <img src={userImage} alt="User" className={styles.userImage} />
              ) : (
                <IonIcon icon={personOutline} aria-hidden="true"></IonIcon>
              )}
            </button>

            <button className={styles.headerActionBtn} aria-label="favourite item">
              <IonIcon icon={starOutline} aria-hidden="true"></IonIcon>
              <span className={styles.btnBadgeStar}>{wishlistCount}</span>
            </button>
            
            <button>
              <Link to={getRoute('summary')} className={styles.headerActionBtn} aria-label="cart item">
                <data className={styles.btnText} value={cartCount}>
                  {formatPrice(totalPrice)}
                </data>
                <IonIcon icon={bagHandleOutline} aria-hidden="true"></IonIcon>
                <span className={styles.btnBadgeCart}>{cartCount}</span>
              </Link>
            </button>

            
            <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
          </div>

          <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
              {linksNavbar.map((item, index) => renderNavItem(item, index))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
