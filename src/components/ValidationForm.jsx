import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import { Link } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function ValidationForm({ session = {} }) {
  const [isValid, setIsValid] = useState(null);
  const { authFetch } = useAuth(); // Use the auth context

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
    documentId: session?.document_number || session?.personal_number || "",
    nationality: session?.issuing_state_name || "",
    documentType: session?.document_type || "",
    dateOfBirth: session?.date_of_birth || "",
  };

  useEffect(() => {
    if (isValid !== null) {
      const sessionId = session?.session_id;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const endpointUrl = `${BACKEND_URL}/kyc/api/session/${sessionId}/resolve/`;
      const handleRejection = () => {
        const options = {
          method: "DELETE",
        };
        authFetch(endpointUrl, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to reject the user");
            }
          })
          .catch((error) => {
            console.error("Error rejecting user:", error);
          });
      };

      const handleAcceptance = () => {
        const options = {
          method: "PATCH",
        };
        authFetch(endpointUrl, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to accept the user");
            }
          })
          .catch((error) => {
            console.error("Error accepting user:", error);
          });
      };



      if (isValid) {
        handleAcceptance(sessionId);
      } else {
        handleRejection(sessionId);
      }
    }
  }, [isValid]);

  return (
    <motion.div {...animationConfig}>
      {session && userData && (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <InputField
              label="First Name"
              value={userData.firstName}
              disabled
            />
            <InputField label="Last Name" value={userData.lastName} disabled />
            <InputField
              label="Document ID"
              value={userData.documentId}
              disabled
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Nationality"
              value={userData.nationality}
              disabled
            />
            <SelectField
              label="Document Type"
              options={documentTypeOptions}
              value={userData.documentType}
              disabled
            />
            <InputField
              label="Date of Birth"
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
