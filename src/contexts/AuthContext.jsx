// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(true);
  // Add the isOriginDevice state, load from localStorage if available
  const [isOriginDevice, setIsOriginDevice] = useState(() => {
    const stored = sessionStorage.getItem("isOriginDevice");
    return stored ? JSON.parse(stored) : false;
  });

  // Function to update the origin device state
  const setDeviceAsOrigin = (value) => {
    const newValue = value === undefined ? true : !!value;
    sessionStorage.setItem("isOriginDevice", JSON.stringify(newValue));
    setIsOriginDevice(newValue);
  };

  useEffect(() => {
    async function initAuth() {
      try {
        setIsLoading(true);

        // Always fetch a fresh token on initialization to prevent expiry issues
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const endpointUrl = `${BACKEND_URL}/kyc/api/service-token/`;

        const response = await fetch(endpointUrl);
        if (!response.ok) throw new Error("Failed to get token");

        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setToken(data.access);
        if(!isOriginDevice) setDeviceAsOrigin(false)

        console.log("Authentication token refreshed");
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []); // Remove token dependency to always fetch fresh token

  // Function to make authenticated API calls
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        authFetch,
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
