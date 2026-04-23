import { useState } from "react";

const TOKEN_KEY = "rul09_admin_token";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY)
  );

  const login = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return { token, login, logout, isAuthenticated };
};
