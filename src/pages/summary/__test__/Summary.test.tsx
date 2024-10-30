import { render, screen } from '@testing-library/react';
import Summary from '../Summary';
import { useShop, useShopActions } from '../../../shared/context/ShopContext';

jest.mock('../../../components/header/Header.tsx', () => () => <div data-testid="header">Header</div>);
jest.mock('../../../components/cartSummary/CartSummary.tsx', () => () => <div data-testid="cart-summary">Cart Summary</div>);
jest.mock('../../../components/shipmentForm/ShipmentForm.tsx', () => () => <div data-testid="shipment-form">Shipment Form</div>);
jest.mock('../../../components/footer/Footer.tsx', () => () => <div data-testid="footer">Footer</div>);

jest.mock('../../../shared/context/ShopContext', () => ({
  useShop: jest.fn(),
  useShopActions: jest.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Summary Page', () => {
  beforeEach(() => {
    (useShop as jest.Mock).mockReturnValue({
      state: {
        cartCount: 3,
        wishlistCount: 5,
        totalPrice: 120.50,
      },
    });

    (useShopActions as jest.Mock).mockReturnValue({
      filterBySearchTerm: jest.fn(),
    });
  });

  test('renders all components (Header, CartSummary, ShipmentForm, and Footer)', () => {
    render(<Summary />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('cart-summary')).toBeInTheDocument();
    expect(screen.getByTestId('shipment-form')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('calls scrollIntoView on topRef when component mounts', () => {
    render(<Summary />);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  test('passes the correct props to Header component', () => {
    render(<Summary />);

    const { state } = useShop();
    const { filterBySearchTerm } = useShopActions();

    expect(screen.getByTestId('header')).toHaveTextContent('Header');
    expect(state.cartCount).toBe(3);
    expect(state.wishlistCount).toBe(5);
    expect(state.totalPrice).toBe(120.50);
    expect(filterBySearchTerm).toBeDefined();
  });
});
