import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";


export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      roles: [],
      hydrated: false,

      // Dùng khi login
      setAuth: ({ user, accessToken }) => {
        let roles = [];

        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          roles = decoded.roles || [];
        }

        set({ user, accessToken, roles });
      },

      // ✅ Dùng khi refresh token
      setAccessToken: (accessToken) => {
        let roles = [];

        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          roles = decoded.roles || [];
        }

        set({ accessToken, roles });
      },

      setHydrated: () => set({ hydrated: true }),

      logout: () => {
        set({ user: null, accessToken: null, roles: [] });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
