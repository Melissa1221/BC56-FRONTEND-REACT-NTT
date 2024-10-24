import payImage from '/assets/images/pay.png'; 
import logoImage from '/assets/images/logo.png'; 
import { IonIcon } from '@ionic/react';
import { logoTwitter, logoFacebook, logoInstagram, logoYoutube } from 'ionicons/icons';

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

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-bottom">
        <div className="wrapper">
          <p className="copyright">&copy; 2024 Borcelle S.A.C.</p>
          <ul className="social-list">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="social-link">
                  <IonIcon icon={link.icon}></IonIcon>
                </a>
              </li>
            ))}
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
