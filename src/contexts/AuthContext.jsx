// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { useServiceToken } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOriginDevice, setIsOriginDevice] = useState(() => {
    const stored = sessionStorage.getItem("isOriginDevice");
    return stored ? JSON.parse(stored) : false;
  });

  // Use React Query to manage the service token
  const { isLoading } = useServiceToken();

  // Function to update the origin device state
  const setDeviceAsOrigin = (value) => {
    const newValue = value === undefined ? true : !!value;
    sessionStorage.setItem("isOriginDevice", JSON.stringify(newValue));
    setIsOriginDevice(newValue);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isOriginDevice,
        setDeviceAsOrigin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
