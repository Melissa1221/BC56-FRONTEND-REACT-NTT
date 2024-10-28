import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar'; 
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar', () => {
  beforeEach(() => {
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
    
   //open
    fireEvent.click(openButton);
    expect(screen.getByText('Inicio')).toBeInTheDocument();

  //close
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
});
