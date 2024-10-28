import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import { ReactElement } from 'react';

describe('Header Component', () => {
  const mockOnSearch = jest.fn();
  const defaultProps = {
    onSearch: mockOnSearch,
    cartCount: 3,
    wishlistCount: 2,
    totalPrice: 150.0,
  };

  const renderWithRouter = (component: ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  test('renders logo with correct alt text', () => {
    renderWithRouter(<Header {...defaultProps} />);
    const logoImage = screen.getByAltText('Logo de Borcelle, una tienda de ecommerce');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', './assets/images/logo.png');
  });

  test('renders navigation links', () => {
    renderWithRouter(<Header {...defaultProps} />);
    const navLinks = ['Inicio', 'Nosotros', 'Productos', 'Contáctanos'];
  
    navLinks.forEach((linkText) => {
      const elements = screen.getAllByText(linkText);
      expect(elements.length).toBeGreaterThan(0);
    });
  });


  test('calls onSearch when typing in the search input', () => {
    renderWithRouter(<Header {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Buscar productos');
    fireEvent.change(searchInput, { target: { value: 'Producto 1' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Producto 1');
  });

  test('renders user, favorite, and cart icons with counts', () => {
    renderWithRouter(<Header {...defaultProps} />);

    const userButton = screen.getByLabelText('user');
    expect(userButton).toBeInTheDocument();

    const favoriteButton = screen.getByLabelText('favourite item');
    expect(favoriteButton).toBeInTheDocument();
    expect(screen.getByText(defaultProps.wishlistCount)).toBeInTheDocument();

    const cartButton = screen.getByLabelText('cart item');
    expect(cartButton).toBeInTheDocument();
    expect(screen.getByText(`s/.${defaultProps.totalPrice.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.cartCount)).toBeInTheDocument();
  });
});
