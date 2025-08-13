import { User } from "@/lib/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  checkAuthFromStorage: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  clearAuth: () => {
    // Clear token from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  checkAuthFromStorage: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      return !!token;
    }
    return false;
  },
}));
