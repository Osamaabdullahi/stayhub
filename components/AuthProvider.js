"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken } from "../utils/storage";
import { refreshToken, logout } from "../services/auth";
import { signOut } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      refreshToken()
        .then((access) => {
          if (access) setIsAuthenticated(true);
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogout,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
