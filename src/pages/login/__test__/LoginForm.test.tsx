import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { loginService } from '../../../services/authService';
import { MemoryRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserProvider } from '../../../shared/context/UserContext';

jest.mock('../../../services/authService');
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <UserProvider>
        <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
      </UserProvider>
      
    );
  });

  test('renders form fields correctly', () => {
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('shows required field validation errors', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    const errorMessages = await screen.findAllByText('Este campo es obligatorio');
    expect(errorMessages).toHaveLength(2); 
  });

  test('shows validation error for short username and password', async () => {
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'ab' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '123' } });
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText('El usuario debe tener al menos 3 caracteres')).toBeInTheDocument();
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument();
    });
  });

  test('calls loginService and shows success alert on successful login', async () => {
    (loginService as jest.Mock).mockResolvedValueOnce({
      firstName: 'John',
      lastName: 'Doe',
      image: 'path/to/image',
    });
    (Swal.fire as jest.Mock).mockResolvedValueOnce({ isConfirmed: true });

    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '123456' } });
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(loginService).toHaveBeenCalledWith('testUser', '123456');
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: 'Bienvenido, has iniciado sesión correctamente.',
        confirmButtonColor: expect.any(String),
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    });
  });

  test('shows error alert when loginService fails', async () => {
    (loginService as jest.Mock).mockRejectedValueOnce(new Error('Credenciales incorrectas.'));
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '123456' } });
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Credenciales incorrectas.',
        confirmButtonColor: expect.any(String),
        confirmButtonText: 'Cerrar',
      });
    });
  });
});
