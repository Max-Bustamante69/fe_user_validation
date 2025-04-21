import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField";
import Button from "./Button";
import SelectField from "./SelectField";
import { Link } from "react-router";

function ValidationForm({ user = {} }) {
  // Animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  // Safely access user properties with fallbacks to empty string
  const userData = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    documentId: user?.document_id || "",
    nationality: user?.nationality || "",
    documentType: user?.document_type || "",
    dateOfBirth: user?.date_of_birth || "",
  };

  return (
    <motion.div {...animationConfig}>
      {user && userData && (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <InputField
              label="First Name"
              value={userData.firstName}
              disabled
            />
            <InputField label="Last Name" value={userData.firstName} disabled />
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
              <Button variant="outline">No soy yo</Button>
            </Link>
            <Link to="/success">
              <Button variant="primary">Confirmar</Button>
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
}

export default ValidationForm;
