import {cva} from 'class-variance-authority';
import { cn } from '@/lib/utils/utils';

import "@styles/tailwind.css";

const buttonVariants = cva(
  "flex items-center justify-center font-medium transition-all duration-200 ease-in cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-accent hover:bg-highlight-text rounded-lg px-5 py-2.5",
        outline:
          "border border-accent text-highlight-text px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition",
        rounded:
          "rounded-full bg-accent hover:bg-highlight-text text-white flex items-center justify-center p-0",
        //para implementar rounded el boton debe de tener w y h iguales y el icono debe tener  tamaño w y h iguales, de menor  tamaño que el boton
        underline: "text-highlight-text bg-transparent hover:underline",
      },
      size: {
        sm: "h-8 py-2 px-3",
        md: "h-10 py-2 px-4",
        lg: "h-12 py-3 px-5",
        roundSm: "w-10 h-10 p-0",
        roundMd: "w-12 h-12 p-0",
        roundLg: "w-16 h-16 p-0",
      },
    },
    defaultVariant: {
      variant: "primary",
      size: "md",
    },
  }
);
function Button({ children, className, size, variant, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
