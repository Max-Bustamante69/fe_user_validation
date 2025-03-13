import { useState, useEffect, use } from "react";
import axios from "axios";
import { documentTypeOptions } from "../lib/utils/constants";
import { motion } from "framer-motion";
import InputField from "./InputField"; 
import Button from "./Button";
import SelectField from "./SelectField";
import { useNavigate } from "react-router";

import "../styles/tailwind.css";

function DiditForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    documentId: "",
    documentType: "",
    features: "OCR",
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(status && status.type === "error") {
      console.log("Redirecting to /failed");
      navigate("/failed");
    }
  }, [status, navigate]);


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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
         
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
          />
     

    

        <Button
          variant={"primary"}
          size={"md"}
          type="submit"
          disabled={isLoading}
          aria-label="Create KYC Session"
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
    </motion.div>
  );
}

export default DiditForm;
