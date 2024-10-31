import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { MemoryRouter } from 'react-router-dom';
import { useUser } from '../../shared/context/UserContext';

jest.mock('../../shared/context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      firstName: 'Juan',
      lastName: 'Pérez',
    });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  });

  test('initially does not show menu items', () => {
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
  });

  test('toggles sidebar open and close', () => {
    const openButton = screen.getByLabelText(/open menu/i);

    // Open sidebar
    fireEvent.click(openButton);
    expect(screen.getByText('Inicio')).toBeInTheDocument();

    // Close sidebar
    fireEvent.click(screen.getByLabelText(/close menu/i));
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
  });

  test('closes sidebar when a nav item is clicked', async () => {
    fireEvent.click(screen.getByLabelText(/open menu/i));
    fireEvent.click(screen.getByText('Inicio'));

    await waitFor(() => {
      expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
    });
  });

  test('closes sidebar when overlay is clicked', async () => {
    fireEvent.click(screen.getByLabelText(/open menu/i));
    const overlay = screen.getByTestId('overlay');

    fireEvent.click(overlay);

    await waitFor(() => {
      expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
    });
  });

  test('displays welcome message with user name when logged in', () => {
    fireEvent.click(screen.getByLabelText(/open menu/i));
    expect(screen.getByText('Bienvenido: Juan Pérez')).toBeInTheDocument();
  });
});
