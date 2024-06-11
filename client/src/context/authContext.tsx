import React, { createContext, useState, useEffect, ReactNode } from "react";

// Typage du contexte AuthContext
export interface AuthContextType {
  isConnect: boolean;
  login: () => void;
}

// Création du contexte
export const AuthContext = createContext<AuthContextType>({
  isConnect: false,
  login: () => {},
});

// Composant fournisseur du contexte
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnect, setIsConnect] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = !!document.cookie;
    setIsConnect(isAuthenticated);
  }, []);

  const login = () => {
    setIsConnect(true);
  };

  const authContextValue: AuthContextType = {
    isConnect,
    login,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
