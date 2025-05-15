import { useState, useEffect } from "react";
import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"; // Import the auth context
import Loader from "./Loader";

function DiditForm() {
  const navigate = useNavigate();
  const { authFetch, isLoading: authLoading, setDeviceAsOrigin } = useAuth(); // Use the auth context

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentId: "",
    documentType: "",
    features: "OCR",
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.documentId ||
      !formData.documentType
    ) {
      setStatus({
        message: "Por favor complete todos los campos requeridos",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setStatus({ message: "Procesando solicitud...", type: "processing" });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const endpointUrl = `${BACKEND_URL}/kyc/api/kyc/`;

    try {
      // This endpoint doesn't require auth but we use authFetch for consistency
      const response = await authFetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          document_id: formData.documentId,
          document_type: formData.documentType,
          features: formData.features,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create KYC session");
      }

      const sessionData = await response.json();

      setDeviceAsOrigin(true); // Set device as origin
      window.location.href = sessionData.verification_url;
    } catch (error) {
      console.error("KYC session creation failed:", error);
      setStatus({
        message: error.message || "Error al crear la sesión de validación",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  // Show auth loading state if authentication is still initializing
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader text="Autenticando..." size="lg" spinner="accent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {status && status.type === "error" && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg ">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Primer Nombre"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Juan"
            required
          />
          <InputField
            label="Apellido"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Rodriguez"
            required
          />
        </div>

        <SelectField
          label="Tipo de Documento"
          id="documentType"
          options={documentTypeOptions}
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          required
          aria-label="Tipo de Documento"
          aria-required="true"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z" fill="%236B7280"/></svg>\')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.5rem center",
          }}
        />
        <InputField
          label="Numero de Documento"
          type="text"
          id="documentId"
          name="documentId"
          value={formData.documentId}
          onChange={handleChange}
          placeholder="Ingresa tu Numero de Documento"
          required
        />

        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={isLoading}
          aria-label="Create KYC Session"
          className={`w-full${
            isLoading ? " opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Procesando...</span>
            </>
          ) : (
            "Crear Registro"
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default DiditForm;
