import React from "react";
import Card from "@components/Card";
import DiditForm from "@/components/DiditForm";

function Form() {
  return (
    <Card className="flex flex-col gap-12 shadow-xl">
      <div>
        <h1 className="text-3xl text-primary font-bold ">
          Formulario de Autenticación
        </h1>
        <h2 className="text-lg text-primary-text font-semibold">
          Rellena todos los campos con tu información
        </h2>
      </div>
      <DiditForm />
    </Card>
  );
}

export default Form;
  