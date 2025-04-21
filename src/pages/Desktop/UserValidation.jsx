// UserValidation.jsx
import React, { useEffect, useState } from "react";
import ValidationForm from "@/components/ValidationForm";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

function UserValidation() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the auth context
  const { authFetch, isLoading: authLoading } = useAuth();


  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionId = sessionStorage.getItem("sessionId");
      if (!sessionId) {
        setStatus({
          message: "No session ID found",
          type: "error",
        });
        navigate("/failed");
        return;
      }

      try {
        setIsLoading(true);
        const sessionId = sessionStorage.getItem("sessionId");
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const endpointUrl = `${BACKEND_URL}/kyc/api/session/${sessionId}/`;


        // Use authFetch instead of axios
        const response = await authFetch(endpointUrl, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch session data");
        }
        const data = await response.json();

        const sessionData = data.kyc;

        setSession(sessionData);
        setStatus({
          message: "Session data fetched successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error fetching session data:", error);
        setStatus({
          message: error.message || "Error fetching session data",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch data once authentication is ready
    if (!authLoading) {
      fetchSessionData();
    }
  }, [authLoading, authFetch]);

  // Show loading state while authentication or data fetching is in progress
  if (authLoading || isLoading) {
    return (
      <Card className="flex flex-col gap-12 shadow-xl">
        <p className="text-center">Loading...</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-12 shadow-xl">
      <div>
        <h1 className="text-3xl text-primary font-bold">
          Formulario de Validacion
        </h1>
        <h2 className="text-lg text-primary-text font-semibold">
          Valida tu identidad
        </h2>
      </div>

      {status?.type === "error" && (
        <p className="text-red-500">{status.message}</p>
      )}

      {session && (
        <ValidationForm session={session} />
      )}
    </Card>
  );
}

export default UserValidation;
