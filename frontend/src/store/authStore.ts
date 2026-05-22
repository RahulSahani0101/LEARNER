import { create } from "zustand";
import { clearTokens, getAccessToken, getRefreshToken, getSessionMeta, persistSessionMeta, persistTokens } from "../lib/api";
import type { AuthPayload, Role } from "../types";

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  fullName: string;
  role: Role | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (payload: AuthPayload) => void;
  logout: () => void;
}

/**
 * Global auth session store with token lifecycle helpers.
 */
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getAccessToken()),
  email: getSessionMeta()?.email ?? "",
  fullName: getSessionMeta()?.fullName ?? "",
  role: getSessionMeta()?.role ?? null,
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  setAuth: (payload) => {
    persistTokens(payload);
    persistSessionMeta(payload);
    set({
      isAuthenticated: true,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    });
  },
  logout: () => {
    clearTokens();
    set({
      isAuthenticated: false,
      email: "",
      fullName: "",
      role: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
