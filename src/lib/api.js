import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Base fetch function with auth
const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token expired, try to refresh
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const refreshResponse = await fetch(
        `${BACKEND_URL}/kyc/api/token/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        const { access } = await refreshResponse.json();
        localStorage.setItem("access_token", access);
        // Retry the original request with new token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${access}`,
          },
        });
      }
    }
    // If refresh fails, throw error
    throw new Error("Authentication failed");
  }

  return response;
};

// Custom hook for fetching session data
export const useSessionData = (documentId) => {
  return useQuery({
    queryKey: ["session", documentId],
    queryFn: async () => {
      if (!documentId) throw new Error("No document ID provided");

      const response = await authFetch(
        `${BACKEND_URL}/kyc/api/session/${documentId}/`
      );
      if (!response.ok) throw new Error("Failed to fetch session data");

      const data = await response.json();
      return data.data;
    },
    enabled: !!documentId,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    retry: 1,
  });
};

// Custom hook for fetching service token
export const useServiceToken = () => {
  return useQuery({
    queryKey: ["serviceToken"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/kyc/api/service-token/`);
      if (!response.ok) throw new Error("Failed to get service token");

      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return data;
    },
    staleTime: 1000 * 60 * 55, // Consider token fresh for 55 minutes
    retry: 1,
  });
};
