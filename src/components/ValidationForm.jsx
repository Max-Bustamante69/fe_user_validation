import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import { Link } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { authFetch } from "@/lib/api";

function ValidationForm({ session = {} }) {
  const [isValid, setIsValid] = useState(null);
  const { isOriginDevice } = useAuth();

  // Animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  // Safely access user properties with fallbacks to empty string
  const userData = {
    firstName: session?.first_name || "",
    lastName: session?.last_name || "",
    documentId: session?.personal_number || session?.document_number || "",
    nationality: session?.issuing_state_name || "",
    documentType: session?.document_type || "",
    dateOfBirth: session?.date_of_birth || "",
  };

  useEffect(() => {
    if (isValid !== null) {
      const sessionId = session?.session_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const endpointUrl = `${BACKEND_URL}/kyc/api/session/${sessionId}/resolve/`;

      const handleRejection = async () => {
        try {
          const response = await authFetch(endpointUrl, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error("Failed to reject the user");
          }
        } catch (error) {
          console.error("Error rejecting user:", error);
        }
      };

      const handleAcceptance = async () => {
        try {
          const response = await authFetch(endpointUrl, {
            method: "PATCH",
          });
          if (!response.ok) {
            throw new Error("Failed to accept the user");
          }
        } catch (error) {
          console.error("Error accepting user:", error);
        }
      };

      if (isValid) {
        handleAcceptance();
      } else {
        handleRejection();
      }
    }
  }, [isValid, session?.session_id]);

  return (
    <motion.div {...animationConfig}>
      {session && userData && (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Primer Nombre"
              value={userData.firstName}
              disabled
            />
            <InputField label="Apellido" value={userData.lastName} disabled />
            <InputField
              label="Número de Documento"
              value={userData.documentId}
              disabled
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Nacionalidad"
              value={userData.nationality}
              disabled
            />
            <SelectField
              label="Tipo de Documento"
              id="documentType"
              options={documentTypeOptions}
              value={userData.documentType}
              disabled
              aria-label="Tipo de Documento"
              aria-disabled="true"
            />
            <InputField
              label="Fecha de Nacimiento"
              value={userData.dateOfBirth}
              disabled
            />
          </div>

          {/* Action buttons - spans both columns */}
          <div className="flex w-full justify-around lg:col-span-2 mt-4">
            <Link to="/failed">
              <Button onClick={() => setIsValid(false)} variant="outline">
                No soy yo
              </Button>
            </Link>

            <Link to="/success">
              <Button onClick={() => setIsValid(true)} variant="primary">
                Confirmar
              </Button>
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
}

export default ValidationForm;
