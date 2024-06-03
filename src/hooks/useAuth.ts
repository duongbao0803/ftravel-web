import { AuthState } from "@/interfaces/interfaces";
import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      role: null,
      setRole: (role: string) => set({ role }),

      isAuthenticated: !!Cookies.get("accessToken"),
      login: () => {
        set({ isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        sessionStorage.removeItem("keys");
        set({ isAuthenticated: false });
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthState) => ({
        role: state.role,
      }),
    },
  ),
);

export default useAuth;
