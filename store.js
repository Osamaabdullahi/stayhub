import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAdmin: false, // Stores if the user is an admin
      isLoggedIn: false,

      // Action to log in the user
      login: (userInfo) => {
        return set({ user: userInfo, isAdmin: false, isLoggedIn: true });
      },

      // Action to log out the user
      logout: () => {
        set({ user: null, isAdmin: false, isLoggedIn: false });
      },

      // Check if user is admin
      checkAdmin: () => {
        const { user } = get();
        return user && user.role === "admin";
      },
    }),
    {
      name: "auth-storage", // unique name for the local storage key
      getStorage: () => localStorage, // specify localStorage as the storage
    }
  )
);
