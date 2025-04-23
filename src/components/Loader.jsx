import React from "react";
import {
  PulseLoader,
  ClipLoader,
  BeatLoader,
  HashLoader,
} from "react-spinners";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";

// Loader variants using class-variance-authority
const loaderVariants = cva("flex flex-col items-center justify-center", {
  variants: {
    size: {
      sm: "p-2 gap-2",
      md: "p-4 gap-3",
      lg: "p-6 gap-4",
      xl: "p-8 gap-5",
    },
    variant: {
      default: "text-primary ",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

// Size mappings for the spinner
const spinnerSizes = {
  sm: 20,
  md: 30,
  lg: 40,
  xl: 50,
};

//  --color-primary: #203c8a;
//   --color-accent: #ea5865;
//   --color-primary-text: #1e1e1c;
//   --color-secondary-text: #253058;
//   --color-placeholder-text:#7A7F93; 
//   --color-drop-shadow: #E3EBFB;
//   --color-highlight-text:#D23643; 
//   --font-poppins: Poppins, sans-serif;
// Color mappings (using your color palette)
const spinnerColors = {
  default: "#203c8a", // --color-primary
  primary: "#203c8a", // --color-primary
  secondary: "#253058", // --color-secondary-text
  accent: "#ea5865", // --color-accent
  white: "#FFFFFF", // Assuming white is needed
};

const Loader = ({
  type = "clip",
  size = "md",
  variant = "default",
  text = "Loading...",
  showText = true,
  className = "",
  spinner = "default",
}) => {
  // Map of spinner types
  const spinners = {
    pulse: PulseLoader,
    clip: ClipLoader,
    beat: BeatLoader,
    hash: HashLoader,
  };

  const SpinnerComponent = spinners[type] || spinners.clip;
  const spinnerSize = spinnerSizes[size] || spinnerSizes.md;
  const spinnerColor = spinnerColors[spinner] || spinnerColors.default;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(loaderVariants({ size, variant }), className)}
    >
      <SpinnerComponent
        color={spinnerColor}
        loading={true}
        size={spinnerSize}
        aria-label="Loading Spinner"
      />
      {showText && <p className="font-medium">{text}</p>}
    </motion.div>
  );
};

export default Loader;
