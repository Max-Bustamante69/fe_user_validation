// UserValidation.jsx
import React, { useEffect, useState } from "react";
import ValidationForm from "@/components/ValidationForm";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import Loader from "@/components/Loader";

function UserValidation() {
  const navigate = useNavigate();
  const { documentId } = useParams(); // Get the documentId from URL params
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the auth context
  const { authFetch, isLoading: authLoading, isOriginDevice } = useAuth();

  useEffect(() => {
    const fetchSessionData = async () => {
    
      if (!documentId) {
        setStatus({
          message: "No document ID found",
          type: "error",
        });
        navigate("/failed");
        return;
      }

      try {
        setIsLoading(true);
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const endpointUrl = `${BACKEND_URL}/kyc/api/session/${documentId}/`;

        // Use authFetch instead of axios
        const response = await authFetch(endpointUrl, {
          method: "GET",
        });

        if (!response.ok) {
          navigate("/failed");
        }

        const res = await response.json();

        const sessionData = res.data; // Assuming the response structure is { data: { ... } }

        console.log("Session data:", sessionData);

        const userData = sessionData.kyc;

        if (sessionData == null) {
          setStatus({
            message: "No session data found",
            type: "error",
          });
          navigate("/failed");
          return;
        }

        // You can use documentId here as needed
        console.log("Document ID from URL:", documentId);

        setSession({
          ...userData,
          session_id: sessionData.session_id,
        });

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
  }, [authLoading, authFetch, documentId]); // Added documentId as dependency

  // Show loading state while authentication or data fetching is in progress
  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow w-full h-full flex-1">
        <Loader text="Autenticando..." size="lg" spinner="accent" />
      </div>
    );
  }

  return (
    <Card className="flex flex-col gap-12 shadow-xl">
      {isOriginDevice ? (
        <>
          <div>
            <h1 className="text-3xl text-primary font-bold">
              Formulario de Validacion
            </h1>
            <h2 className="text-lg text-primary-text font-semibold">
              Valida tu identidad
            </h2>
          </div>
          {
            session &&  (
              <ValidationForm session={session} />
            )
          }
        </>
      ) :  session && (
        //  Mensaje de confirmacion del proceso y terminar el flujo diciendo que continue el proceso en el dispositivo de origen
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl text-primary font-bold">
            Validación de Identidad
          </h1>
          <h2 className="text-lg text-primary-text font-semibold">
            Por favor, completa el proceso en el dispositivo de origen.
          </h2>
          <p className="text-sm text-primary-text">
            Si no puedes continuar, por favor contacta a soporte.
          </p>
        </div>
      )}

      {status?.type === "error" && (
        <p className="text-red-500">{status.message}</p>
      )}
    </Card>
  );

}

export default UserValidation;
