import { loginService } from "../authService";

describe('loginService', () => {
  const mockResponse = {
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
    firstName: 'John',
    lastName: 'Doe',
    image: 'testImageUrl',
  };

  beforeEach(() => {

    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it('should return data and set sessionStorage correctly on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const result = await loginService('username', 'password');


    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'username', password: 'password', expiresInMins: 30 }),
    });

    expect(sessionStorage.getItem('accessToken')).toBe(mockResponse.accessToken);
    expect(sessionStorage.getItem('firstName')).toBe(mockResponse.firstName);
    expect(sessionStorage.getItem('userImage')).toBe(mockResponse.image);

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error with the correct message on unsuccessful login', async () => {
    const errorMessage = 'Credenciales incorrectas.';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      } as Response)
    );

    await expect(loginService('username', 'wrongpassword')).rejects.toThrow(errorMessage);
  });

  it('should throw a default error message when no error message is provided by the server', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      } as Response)
    );

    await expect(loginService('username', 'wrongpassword')).rejects.toThrow('Credenciales incorrectas.');
  });
});
