import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isConnect: boolean;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isConnect: false,
  login: () => {},
});

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

export type { AuthContextType };