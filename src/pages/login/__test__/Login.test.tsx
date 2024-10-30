import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';


jest.mock('../LoginForm', () => () => <div data-testid="login-form">Login Form</div>);
jest.mock('../ForgotPaswordModal.tsx', () => ({ onClose }: { onClose: () => void }) => (
  <div data-testid="forgot-password-modal">
    Forgot Password Modal
    <button onClick={onClose}>Cerrar</button>
  </div>
));

describe('Login Component', () => {
  test('renders login heading and login form', () => {
    render(<Login />);
    const loginHeading = screen.getByRole('heading', { name: /iniciar sesión/i });
    expect(loginHeading).toBeInTheDocument();

    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  test('renders forgot password link', () => {
    render(<Login />);
    const forgotPasswordLink = screen.getByRole('link', { name: /olvidaste tu contraseña\?/i });
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  test('opens forgot password modal when the link is clicked', () => {
    render(<Login />);
    const forgotPasswordLink = screen.getByRole('link', { name: /olvidaste tu contraseña\?/i });
    fireEvent.click(forgotPasswordLink);

    const modal = screen.getByTestId('forgot-password-modal');
    expect(modal).toBeInTheDocument();
  });

  test('closes forgot password modal when close button is clicked', () => {
    render(<Login />);
    const forgotPasswordLink = screen.getByRole('link', { name: /olvidaste tu contraseña\?/i });
    fireEvent.click(forgotPasswordLink);

    const closeButton = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeButton);

    const modal = screen.queryByTestId('forgot-password-modal');
    expect(modal).not.toBeInTheDocument();
  });
});
