export interface SigninValues {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  infoUser: object;
  fetchUserInfo: () => void;
}

export interface responseTokenProps {
  accessToken: string;
}

export interface SignupValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  role: number;
}

export interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
