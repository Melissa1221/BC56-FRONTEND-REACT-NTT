import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { logoTwitter, logoFacebook, logoInstagram, logoYoutube } from 'ionicons/icons';

describe('Footer Component', () => {
  test('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2024 Borcelle S.A.C.')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);
    const socialIcons = [logoTwitter, logoFacebook, logoInstagram, logoYoutube];

    socialIcons.forEach((icon, index) => {
      const socialLink = screen.getAllByRole('link')[index];
      expect(socialLink).toBeInTheDocument();
      expect(socialLink.querySelector('ion-icon')).toBeInTheDocument();
    });
  });

  test('renders logo image with correct alt text', () => {
    render(<Footer />);
    const logoImage = screen.getByAltText('Borcelle S.A.C.');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/assets/images/logo.png');
    expect(logoImage).toHaveAttribute('width', '179');
    expect(logoImage).toHaveAttribute('height', '26');
  });
  

  test('renders payment methods image with correct alt text', () => {
    render(<Footer />);
    const paymentImage = screen.getByAltText('métodos de pago disponibles');
    expect(paymentImage).toBeInTheDocument();
    expect(paymentImage).toHaveAttribute('width', '313');
    expect(paymentImage).toHaveAttribute('height', '28');
  });
  
});
