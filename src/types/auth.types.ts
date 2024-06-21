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

export interface ResponseTokenProps {
  "access-token": string;
}

export interface SignupValues {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  role: 0;
}

export interface UserInfo {
  // id: number;
  name?: string;
  address?: string;
  "avatar-url"?: string;
  dob?: Date | string;
  email: string;
  role?: number;
  "phone-number": string;
  "full-name": string;
}
