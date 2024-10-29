export interface LoginCredentials {
    username: string;
    password: string;
    expiresInMins?: number; 
  }
  
  export interface AuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  }
  
  export interface ForgotPasswordRequest {
    email: string;
  }
  