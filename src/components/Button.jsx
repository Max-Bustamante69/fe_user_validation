import {cva} from 'class-variance-authority';
import { cn } from '../lib/utils/utils';
const buttonVariants = cva(
  "flex items-center justify-center font-medium transition-all duration-200 ease-in cursor-pointer shadow-lg",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-accent hover:bg-highlight-text rounded-lg px-5 py-2.5",
        outline: "text-highlight-text bg-transparent hover:underline",
        rounded:
          "rounded-full bg-accent hover:bg-highlight-text text-white flex items-center justify-center p-0",
        //para implementar rounded el boton debe de tener w y h iguales y el icono debe tener  tamaño w y h iguales, de menor  tamaño que el boton
        underline:
          "border border-accent text-highlight-text px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition",
      },
      size: {
        md: "h-10 py-2 px-4",
        sm: "h-8 py-2 px-3",
        lg: "h-12 py-3 px-5",
      },
    },
    defaultVariant: {
      variant: "primary",
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
