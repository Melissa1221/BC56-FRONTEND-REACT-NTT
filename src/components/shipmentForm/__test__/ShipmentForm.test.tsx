import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShipmentForm from '../ShipmentForm';
import { useShopActions } from '../../../shared/context/ShopContext';

jest.mock('../../../shared/context/ShopContext', () => ({
  useShopActions: jest.fn(),
}));

describe('ShipmentForm', () => {
  const resetCartMock = jest.fn();
  
  beforeEach(() => {
    (useShopActions as jest.Mock).mockReturnValue({ resetCart: resetCartMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with all fields', () => {
    render(
      <Router>
        <ShipmentForm />
      </Router>
    );

    expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/distrito/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/referencia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument();
  });

  test('validates required fields and shows errors', async () => {
    render(
      <Router>
        <ShipmentForm />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /comprar/i }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/campo obligatorio/i);
      expect(errorMessages.length).toBe(5);
    });

    const nameInput = screen.getByLabelText(/nombres/i);
    const lastnameInput = screen.getByLabelText(/apellidos/i);

    expect(nameInput.parentElement).toHaveTextContent(/campo obligatorio/i);
    expect(lastnameInput.parentElement).toHaveTextContent(/campo obligatorio/i);
  });

  test('shows success alert and resets cart on successful submission', async () => {
    render(
      <Router>
        <ShipmentForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/distrito/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/referencia/i), { target: { value: 'Near Park' } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByRole('button', { name: /comprar/i }));

    await waitFor(() => {
      expect(screen.getByText(/su pedido se registró con éxito/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /aceptar/i }));

    expect(resetCartMock).toHaveBeenCalledTimes(1);
  });

  test('validates phone number correctly', async () => {
    render(
      <Router>
        <ShipmentForm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: 'abc123' } });
    fireEvent.blur(screen.getByLabelText(/teléfono/i));

    expect(screen.getByText(/debe ingresar solo números/i)).toBeInTheDocument();
  });
});