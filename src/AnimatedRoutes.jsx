import React from "react";
import { useLocation } from "react-router";
import { Routes, Route } from "react-router";
import { AnimatePresence } from "framer-motion";

// Main layout
import Layout from "@pages/Desktop/Layout";

// Page components
import Home from "@pages/Desktop/Home";
import Terms from "@pages/Desktop/Terms";
import Form from "@pages/Desktop/Form";
import Success from "@pages/Desktop/Success";
import UserValidation from "./pages/Desktop/UserValidation";

// Error handling components
import ErrorLayout from "@/pages/Desktop/ErrorLayout";
import AuthFailed from "./pages/Desktop/AuthFailed";
import Error404 from "./pages/Desktop/Error404";
import ResponsiveLayout from "./components/ResponsiveLayout";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Main application routes */}
        <Route path="/" element={<ResponsiveLayout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="terms" element={<Terms />} />
          <Route path="didit" element={<Form />} />
          <Route path="success" element={<Success />} />
          <Route
            path="user-validation/:documentId"
            element={<UserValidation />}
          />

          {/* Error routes */}
          <Route path="failed" element={<ErrorLayout />}>
            <Route index element={<AuthFailed />} />
          </Route>

          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <ErrorLayout>
                <Error404 />
              </ErrorLayout>
            }
          ></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
