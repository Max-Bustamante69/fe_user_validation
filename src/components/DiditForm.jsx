import { useState } from "react";
import axios from "axios";
import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField"; 
import Button from "./Button";
import SelectField from "./SelectField";

import "../styles/tailwind.css";

function DiditForm() {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("formData: ", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ message: "Processing request...", type: "processing" });

    try {
      const response = await axios.post("http://127.0.0.1:8000/kyc/api/kyc/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        document_id: formData.documentId,
        document_type: formData.documentType,
        features: formData.features,
      });

      // Redirect to verification URL
      window.location.href = response.data.verification_url;
    } catch (error) {
      setStatus({
        message: error.response?.data?.error || error.message,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputField
              label={"First Name"}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />
          </div>

          <div className="space-y-2">
            <InputField
              label={"Last Name"}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <InputField
            label={"Document ID"}
            type="text"
            id="documentId"
            name="documentId"
            value={formData.documentId}
            onChange={handleChange}
            placeholder="Enter your document ID"
            required
          />
        </div>

        <div className="space-y-2">

          <SelectField
            label={"Document Type"}
            id="documentType"
            options={documentTypeOptions}
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required          
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z" fill="%236B7280"/></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
            }}
          ></SelectField>
        </div>

        <div className="space-y-2">
          <SelectField
          label = "Features"
            id="features"
            options = {[{label: "OCR only", value: "OCR"}]}
            name="features"
            value={formData.features}
            onChange={handleChange}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z" fill="%236B7280"/></svg>\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
            }}
          >
            
          </SelectField>
        </div>

        <Button
          variant={"primary"}
          size={"md"}
          type="submit"
          disabled={isLoading}
          className={`w-full${
            isLoading ? "opacity-80 cursor-not-allowed" : ""
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
              <span>Processing...</span>
            </>
          ) : (
            "Create KYC Session"
          )}
        </Button>
      </form>
      {status && (
        <div
          className={`mt-6 p-4 rounded-lg border ${
            status.type === "error"
              ? "bg-red-900/50 border-red-500 text-red-200"
              : status.type === "processing"
              ? "bg-blue-900/50 border-blue-500 text-blue-200"
              : "bg-green-900/50 border-green-500 text-green-200"
          } transition-all duration-300 animate-fadeIn`}
        >
          {status.type === "error" && (
            <h3 className="font-bold mb-1 flex items-center">
              <svg
                className="w-5 h-5 mr-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Error
            </h3>
          )}
          <p className="text-sm">{status.message}</p>
        </div>
      )}
    </motion.div>
  );
}

export default DiditForm;
