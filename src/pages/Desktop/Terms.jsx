import React from "react";
import Card from "@components/Card";
import ScrollableText from "@components/ScrollableText";
import Button from "@components/Button";
import { terms } from "@/lib/utils/constants";
import { Link } from "react-router";
import { isMobile } from "@/lib/utils/isMobile";

function Terms() {
  return !isMobile() ? (
    <Card className="max-w-6xl gap-4 flex flex-col items-center shadow-2xl w-2/3">
      <div className="font-semibold flex flex-col items-start justify-start w-full">
        <h1 className="text-3xl text-accent">Terminos & Condiciones</h1>
        <h2 className="text-xl text-secondary-text">Tu acuerdo</h2>
      </div>
      <div className="flex flex-col gap-12">
        <ScrollableText text={terms} />
        <div className="flex justify-end w-full gap-8">
          <Link to={"/"} aria-label="Decline Terms and Conditions">
            <Button variant="underline" size={"md"} aria-label="Decline">
              Rechazar
            </Button>
          </Link>
          <Link to={"/didit"} aria-label="Accept Terms and Conditions">
            <Button variant={"primary"} size={"md"} aria-label="Accept">
              Continuar
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  ) : (
    <div className="flex flex-col items-start justify-start gap-4  h-full w-full p-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-text mb-2 tracking-tight">
          Terminos & Condiciones
        </h1>
        <h2 className="text-lg font-semibold text-primary-text text-start mb-4">
          Tu acuerdo
        </h2>
        <hr className="bg-primary-text w-full opacity-20" />
      </div>
      <ScrollableText
        className="shadow-2xl border border-neutral-100 p-2 h-full max-h-2/3"
        text={terms}
      />
      <div className="flex justify-around w-full gap-8">
        <Link to={"/didit"} aria-label="Accept Terms and Conditions">
          <Button variant={"rounded"} size={"md"} aria-label="Accept">
            Aceptar & Continuar
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Terms;