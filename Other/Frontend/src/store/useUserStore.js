import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setAuth: (user, accessToken) => set(() => ({ user, accessToken })),
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setUser: (user) => set(() => ({ user })),
  clearAuth: () =>
    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
    })),
}));
