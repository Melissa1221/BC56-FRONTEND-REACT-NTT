import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from '../CartSummary';
import { useShop, useShopActions } from '../../../shared/context/ShopContext';
import '@testing-library/jest-dom';


jest.mock('../../../shared/context/ShopContext', () => ({
  useShop: jest.fn(),
  useShopActions: jest.fn(),
}));

describe('CartSummary Component', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Producto 1',
      images: ['https://example.com/product1.jpg'],
      price: 10.0,
      quantity: 2,
    },
    {
      id: 2,
      title: 'Producto 2',
      images: ['https://example.com/product2.jpg'],
      price: 20.0,
      quantity: 1,
    },
  ];

  const mockState = {
    cartItems: mockCartItems,
    totalPrice: 40.0,
  };

  const mockRemoveFromCart = jest.fn();
  const mockUpdateCartItemQuantity = jest.fn();

  beforeEach(() => {
    (useShop as jest.Mock).mockReturnValue({ state: mockState });
    (useShopActions as jest.Mock).mockReturnValue({
      handleRemoveFromCart: mockRemoveFromCart,
      handleUpdateCartItemQuantity: mockUpdateCartItemQuantity,
    });
  });

  test('renders cart summary with items', () => {
    render(<CartSummary />);
  
    expect(screen.getByText('Resumen del Carrito')).toBeInTheDocument();
  
    mockCartItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  
    const priceElements = screen.getAllByText(`S/. 20.00`);
    expect(priceElements).toHaveLength(2); 
  
    expect(screen.getByText('Total a pagar:')).toBeInTheDocument();
    expect(screen.getByText(`S/. ${mockState.totalPrice.toFixed(2)}`)).toBeInTheDocument();
  });
  

  test('updates item quantity when input changes', () => {
    render(<CartSummary />);

    const quantityInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(quantityInput, { target: { value: '3' } });


    expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith(mockCartItems[0].id, 3);
  });

  test('removes item from cart when delete button is clicked', () => {
    render(<CartSummary />);

    const deleteButton = screen.getAllByRole('button', { name: /eliminar/i })[0]; 
    fireEvent.click(deleteButton);


    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
  });
});
