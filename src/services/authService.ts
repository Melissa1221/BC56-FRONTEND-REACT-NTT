interface LoginResponse {
  token: string;
  refreshToken?: string;
  [key: string]: string | undefined;
}

export const loginService = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 30 }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Credenciales incorrectas.');
  }

  const data = await response.json();
  

  sessionStorage.setItem('accessToken', data.accessToken);
  sessionStorage.setItem('firstName', data.firstName);
  sessionStorage.setItem('userImage', data.image);

  return data;
};
