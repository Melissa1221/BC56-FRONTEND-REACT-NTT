import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordModal from '../ForgotPaswordModal';


describe('ForgotPasswordModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal with input and buttons', () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /recuperar contraseña/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument();
  });

  test('displays an error message when an invalid email is entered', () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const sendButton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(sendButton);

    expect(screen.getByText(/por favor, ingresa un correo válido/i)).toBeInTheDocument();
  });

  test('sends email and closes modal on valid email entry', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText(/correo electrónico/i);
    const sendButton = screen.getByRole('button', { name: /enviar/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(sendButton);

    expect(window.alert).toHaveBeenCalledWith('Se envió la información al correo ingresado.');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('closes modal when close button is clicked', () => {
    render(<ForgotPasswordModal onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
