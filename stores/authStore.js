import { create } from "zustand";
import { fetchMe } from "../services/authService";

const initialState = {
  token: null,
  isAuthenticated: null,
  username: null,
  firstname: null,
  email: null,
  profilePicture: null,
};

const useAuthStore = create((set) => ({
  ...initialState,
  login: (token, userData) => {
    console.log("userData :", userData);

    localStorage.setItem("token", token);
    set({
      token: token,
      isAuthenticated: true,
      ...userData,
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    set(initialState);
  },
  hydrate: async () => {
    console.log("Hydrate begin");

    const token = localStorage.getItem("token");

    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const userData = await fetchMe(token);
      console.log("hyrate:", userData);

      if (!userData.success) {
        localStorage.removeItem("token");
        // localStorage.clear(); //A tester
        console.log("LocalStorage Cleared");
      }

      if (token && userData.success) {
        set({
          token: token,
          isAuthenticated: true,
          ...userData.data.userData,
        });
        console.log("Hydrate done");
      }
    } catch (error) {
      console.error("Erreur d'hydratation", error);
    }
  },
}));

export default useAuthStore;
