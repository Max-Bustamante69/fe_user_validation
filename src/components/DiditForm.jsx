import { useState } from "react";
import axios from "axios";
import { documentTypeOptions } from "../lib/utils/constants";

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
        console.log('formData: ', formData)
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
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-300"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                            className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="documentId"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Document ID
                    </label>
                    <input
                        type="text"
                        id="documentId"
                        name="documentId"
                        value={formData.documentId}
                        onChange={handleChange}
                        placeholder="Enter your document ID"
                        required
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="documentType"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Document Type
                    </label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                        style={{
                            backgroundImage:
                                'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z" fill="%236B7280"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.5rem center",
                        }}
                    >

                        {
                            documentTypeOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="features"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Features
                    </label>
                    <select
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                        style={{
                            backgroundImage:
                                'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z" fill="%236B7280"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.5rem center",
                        }}
                    >
                        <option value="OCR">OCR only</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${isLoading ? "opacity-80 cursor-not-allowed" : ""
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
                </button>
            </form>
            {status && (
                <div
                    className={`mt-6 p-4 rounded-lg border ${status.type === "error"
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
        </>
    );
}

export default DiditForm;