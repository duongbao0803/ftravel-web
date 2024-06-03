export interface SigninValues {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setRole: (role: string) => void;
  role: string | null;
}

export interface Role {
  role: string | null;
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
