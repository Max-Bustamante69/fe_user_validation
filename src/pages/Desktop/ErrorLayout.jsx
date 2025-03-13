import React from "react";
import fail from "@/assets/pagui-fail.svg";
import { motion } from "framer-motion";
import { Outlet } from "react-router";

function ErrorLayout({children}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-12 relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <img src={fail} alt="Process Failed" />
      <Outlet/>
      {children}
    </motion.div>
  );
}

export default ErrorLayout;
