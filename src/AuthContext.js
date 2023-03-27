import React, { createContext, useContext, useState, useCallback } from "react";
import { Magic } from "magic-sdk";

const AuthContext = createContext();

const magic = new Magic("pk_live_8C45E932620CBB0C");

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginWithMagicLink = useCallback(async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setLoggedIn(true);
    } catch (error) {
      throw error;
    }
  }, []);

  const value = {
    loggedIn,
    setLoggedIn,
    loginWithMagicLink,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
