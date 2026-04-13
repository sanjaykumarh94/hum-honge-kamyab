import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../backend.d";
import type { UserRole } from "../backend.d";

interface AuthStore {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,

      login: (user: User) => {
        set({
          user,
          role: user.role as UserRole,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user: User) => {
        set({ user, role: user.role as UserRole });
      },
    }),
    {
      name: "hhk-auth",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
