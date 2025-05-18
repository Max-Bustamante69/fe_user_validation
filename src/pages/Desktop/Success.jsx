import React from "react";
import Button from "@/components/Button";
import success from "@/assets/pagui-success.svg";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { isMobile } from "@/lib/utils/isMobile";

function Success() {
  return (
    <motion.div
      className="flex flex-col items-center gap-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <img src={success} alt="Process Successful" />
      <div className=" flex flex-col gap-2 items-center text-center">
        <h1 className="text-3xl text-primary font-bold">PROCESO EXITOSO</h1>
        <h2 className="text-2xl text-secondary-text font-light">
          Bienvenido a pagui el mejor canal para facilitar tus compras de manera
          ágil, sencilla y segura a través de WhatsApp
        </h2>
      </div>
      <div className="flex w-full justify-end">
        <Link to={"/"} aria-label="Go to Home Page">
          <Button
            variant={"rounded"}
            size={isMobile() ? "roundMd" : "roundLg"}
            aria-label="Next"
          >
            <IoCheckmarkOutline className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Success;
