// services/auth.ts

import axios from "axios";

interface User {
  password: string;
  email: string;
  // Add more user properties as needed
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { user } = response.data.payload;
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  },

  logout: async (): Promise<void> => {
    // Implement your actual logout logic here
    // For demonstration purposes, simply clear the localStorage
    localStorage.removeItem("authToken"); // assuming you store authentication token in localStorage
  },
  // Add more authentication-related methods as needed
};
