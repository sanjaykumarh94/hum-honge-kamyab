import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../backend.d";
import type { UserRole } from "../backend.d";

interface AuthStore {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  // OTP state
  otpPhone?: string;
  otpSessionId?: number;
  isOtpPending: boolean;
  phoneVerified: boolean;
  // Core auth actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  // OTP actions
  setOtpPending: (phone: string, sessionId: number) => void;
  clearOtpPending: () => void;
  setPhoneVerified: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      otpPhone: undefined,
      otpSessionId: undefined,
      isOtpPending: false,
      phoneVerified: false,

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
          otpPhone: undefined,
          otpSessionId: undefined,
          isOtpPending: false,
        });
      },

      updateUser: (user: User) => {
        set({ user, role: user.role as UserRole });
      },

      setOtpPending: (phone: string, sessionId: number) => {
        set({ otpPhone: phone, otpSessionId: sessionId, isOtpPending: true });
      },

      clearOtpPending: () => {
        set({
          otpPhone: undefined,
          otpSessionId: undefined,
          isOtpPending: false,
        });
      },

      setPhoneVerified: () => {
        set({ phoneVerified: true, isOtpPending: false });
      },
    }),
    {
      name: "hhk-auth",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        phoneVerified: state.phoneVerified,
      }),
    },
  ),
);
