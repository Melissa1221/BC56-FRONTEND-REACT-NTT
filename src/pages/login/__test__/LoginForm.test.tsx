import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import Swal from 'sweetalert2';
import { useUser } from '../../../shared/context/UserContext';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../shared/context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockSetUser = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders username and password fields with a submit button', () => {
    render(<LoginForm />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('shows validation messages when fields are empty and form is submitted', async () => {
    render(<LoginForm />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    const errorMessages = await screen.findAllByText('Este campo es obligatorio');
    expect(errorMessages).toHaveLength(2);
    expect(Swal.fire).not.toHaveBeenCalled();
  });

  test('calls setUser and navigates on successful login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        token: 'mockToken',
        firstName: 'John',
        lastName: 'Doe',
        image: 'image.png',
      }),
    });

    render(<LoginForm />, { wrapper: MemoryRouter });

    fireEvent.input(screen.getByLabelText(/usuario/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.input(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith('John', 'Doe', 'image.png');
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Bienvenido, has iniciado sesión correctamente.',
        confirmButtonColor: expect.any(String),
        confirmButtonText: 'Aceptar',
      });
    });
  });

  test('displays an error alert when login fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        message: 'Credenciales incorrectas.',
      }),
    });

    render(<LoginForm />, { wrapper: MemoryRouter });

    fireEvent.input(screen.getByLabelText(/usuario/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.input(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Ocurrió un error. Inténtalo de nuevo.',
        confirmButtonColor: expect.any(String),
        confirmButtonText: 'Cerrar',
      });
    });
  });
});
