import payImage from '/assets/images/pay.png'; 
import logoImage from '/assets/images/logo.png'; 
import { IonIcon } from '@ionic/react';
import { logoTwitter, logoFacebook, logoInstagram, logoYoutube } from 'ionicons/icons';

const Footer = () => (
  <footer className="footer" id="contact">
  <div className="container">
    <div className="footer-bottom">
      <div className="wrapper">
        <p className="copyright">&copy; 2024 Borcelle S.A.C.</p>
        <ul className="social-list">
          <li><a href="#" className="social-link"><IonIcon icon={logoTwitter}></IonIcon></a></li>
          <li><a href="#" className="social-link"><IonIcon icon={logoFacebook}></IonIcon></a></li>
          <li><a href="#" className="social-link"><IonIcon icon={logoInstagram}></IonIcon></a></li>
          <li><a href="#" className="social-link"><IonIcon icon={logoYoutube}></IonIcon></a></li>
        </ul>
      </div>
      <a href="#" className="logo">
        <img src={logoImage}  width="179" height="26" loading="lazy" alt="Borcelle S.A.C." />
      </a>
      <img src={payImage} width="313" height="28" alt="métodos de pago disponibles" className="w-100" />
    </div>
  </div>
</footer>
);

export default Footer;
