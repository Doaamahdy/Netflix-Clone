import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: true,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`/api/v1/auth/signup`, credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(`/api/v1/auth/login`, credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (err) {
      toast.error(err.response.data.message || "|Something went wrong");
      set({ isLoggingIn: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (err) {
      set({ isLoggingOut: false });
      toast.error(err.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });

      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
