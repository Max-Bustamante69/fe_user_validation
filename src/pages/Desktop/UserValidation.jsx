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
        <div className="flex flex-col items-center justify-center gap-6 md:py-6">
          <h1 className="text-3xl text-primary font-bold text-center">
            Sesión Activa
          </h1>

          <div className="flex justify-center items-center my-8">
            <div className="bg-accent/40 rounded-full p-10 shadow-md transition-all duration-300 hover:scale-105">
              <IoCheckmarkOutline className="text-primary text-8xl animate-pulse" />
            </div>
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-2xl text-primary-text font-semibold mb-3">
              Continúa el proceso en el dispositivo original
            </h2>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-4">
              <p className="text-primary-text">
                Tu proceso de validación de identidad está activo. Regresa al
                dispositivo desde donde iniciaste la sesión para completar el
                proceso. Ya puedes cerrar esta ventana.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Si tienes problemas para continuar, contacta a nuestro equipo de{" "}
                <a className="underline font-semibold" href="https://pagui.co/">
                  soporte
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default UserValidation;
