import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  accessToken: null,
  setUser: (user, token) =>
    set((state) => ({ user: user, accessToken: token })),
}));
