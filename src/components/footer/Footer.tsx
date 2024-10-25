import React from 'react';
import payImage from '/assets/images/pay.png'; 
import logoImage from '/assets/images/logo.png'; 
import { IonIcon } from '@ionic/react';
import { logoTwitter, logoFacebook, logoInstagram, logoYoutube } from 'ionicons/icons';
import styles from './Footer.module.css';

const socialLinks = [
  {
    icon: logoTwitter,
    url: '#'
  },
  {
    icon: logoFacebook,
    url: '#'
  },
  {
    icon: logoInstagram,
    url: '#'
  },
  {
    icon: logoYoutube,
    url: '#'
  }
];

const Footer: React.FC = () => (
  <footer className={styles.footer} id="contact">
    <div className={styles.container}>
      <div className={styles.footerBottom}>
        <div className={styles.wrapper}>
          <p className={styles.copyright}>&copy; 2024 Borcelle S.A.C.</p>
          <ul className={styles.socialList}>
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className={styles.socialLink}>
                  <IonIcon icon={link.icon}></IonIcon>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a href="#" className={styles.logo}>
          <img src={logoImage} width="179" height="26" loading="lazy" alt="Borcelle S.A.C." />
        </a>
        <img src={payImage} width="313" height="28" alt="métodos de pago disponibles" className={styles.paymentMethods} />
      </div>
    </div>
  </footer>
);

export default Footer;
