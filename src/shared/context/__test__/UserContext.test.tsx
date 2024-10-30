import { FC } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserProvider, useUser } from '../UserContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const MockComponent: FC = () => {
  const { firstName, lastName, userImage, setUser, logout } = useUser();

  return (
    <div>
      <p data-testid="firstName">{firstName}</p>
      <p data-testid="lastName">{lastName}</p>
      <p data-testid="userImage">{userImage}</p>
      <button onClick={() => setUser('John', 'Doe', 'image.png')} data-testid="setUser">
        Set User
      </button>
      <button onClick={logout} data-testid="logout">
        Logout
      </button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    sessionStorage.clear(); 
  });

  it('provides initial null values when no session data exists', () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('firstName')).toHaveTextContent('');
    expect(screen.getByTestId('lastName')).toHaveTextContent('');
    expect(screen.getByTestId('userImage')).toHaveTextContent('');
  });

  it('updates the context and sessionStorage when setUser is called', async () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    userEvent.click(screen.getByTestId('setUser'));

    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toHaveTextContent('John');
      expect(screen.getByTestId('lastName')).toHaveTextContent('Doe');
      expect(screen.getByTestId('userImage')).toHaveTextContent('image.png');
    });

    expect(sessionStorage.getItem('firstName')).toBe('John');
    expect(sessionStorage.getItem('lastName')).toBe('Doe');
    expect(sessionStorage.getItem('userImage')).toBe('image.png');
  });

  it('resets context and sessionStorage when logout is called', async () => {
    render(
      <UserProvider>
        <MockComponent />
      </UserProvider>
    );

    userEvent.click(screen.getByTestId('setUser'));

    userEvent.click(screen.getByTestId('logout'));

    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toHaveTextContent('');
      expect(screen.getByTestId('lastName')).toHaveTextContent('');
      expect(screen.getByTestId('userImage')).toHaveTextContent('');
    });

    expect(sessionStorage.getItem('firstName')).toBeNull();
    expect(sessionStorage.getItem('lastName')).toBeNull();
    expect(sessionStorage.getItem('userImage')).toBeNull();
  });
});
