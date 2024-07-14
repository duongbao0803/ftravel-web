import { Dayjs } from "dayjs";

export interface SigninValues {
  email: string;
  password: string;
}

export interface AuthState {
  role: string | null;
  isAuthenticated: boolean;
  setRole: (role: string | null) => void;
  login: () => void;
  logout: () => void;
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
  id: number;
  address?: string;
  "avatar-url"?: string;
  dob?: string | number | Date | Dayjs;
  email: string;
  role?: number | string;
  "phone-number"?: string;
  "full-name"?: string;
  gender?: number | string;
}

export interface AccountData {
  name?: string;
  address?: string;
  "avatar-url"?: string;
  dob?: Date | string | Dayjs;
  email: string;
  role?: number;
  "phone-number"?: string;
  "full-name"?: string;
  gender?: number | string;
}

export interface UserInfoDetail {
  id: number;
  name?: string;
  address?: string;
  "avatar-url"?: string;
  dob?: Date | string;
  email: string;
  role?: number;
  "phone-number": string;
  "full-name": string;
}
