import React from "react";
import Layout from "./pages/Desktop/Layout";
import Home from "./pages/Desktop/Home";
import Terms from "./pages/Desktop/Terms";
import DiditForm from "@components/DiditForm";

import { useLocation } from "react-router";
import { Routes, Route } from "react-router";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/didit" element={<DiditForm />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
