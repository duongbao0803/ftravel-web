import { AuthState } from "@/types/auth.types";
import Cookies from "js-cookie";
import { create } from "zustand";

const useAuth = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  isAuthenticated: !!Cookies.get("accessToken"),
  login: () => {
    set({ isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.removeItem("keys");
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
