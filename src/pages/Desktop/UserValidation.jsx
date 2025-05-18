// UserValidation.jsx
import React from "react";
import ValidationForm from "@/components/ValidationForm";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";
import { useSessionData } from "@/lib/api";
import { useParams, useNavigate } from "react-router";
import Loader from "@/components/Loader";
import { IoCheckmarkOutline } from "react-icons/io5"; // Import checkmark icon
import { motion } from "framer-motion";

function UserValidation() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { isOriginDevice } = useAuth();
  const { data: session, isLoading, error } = useSessionData(documentId);

  if (error) {
    navigate("/failed");
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {isOriginDevice ? (
        <>
          <div>
            <h1 className="text-3xl text-primary font-bold">
              Formulario de Validación
            </h1>
            <h2 className="text-lg text-primary-text font-semibold">
              Valida tu identidad
            </h2>
          </div>
          <ValidationForm session={session} />
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Dispositivo no autorizado
          </h1>
          <p className="text-lg text-secondary-text">
            Por favor, accede desde el dispositivo original donde se inició la
            validación.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default UserValidation;
