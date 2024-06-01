import React, { createContext } from "react";

interface AuthContextType {
  isConnect: string;
}

export const AuthContext = createContext<AuthContextType>({ isConnect: "" });

export const AuthContextProvider: React.FC = ({ children }) => {
  const isConnect = document.cookie;
  // Pour la connexion des employés

  return (
    <AuthContext.Provider value={{ isConnect }}>
      {children}
    </AuthContext.Provider>
  );
};