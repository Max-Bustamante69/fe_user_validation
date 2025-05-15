import React, { useState } from "react";
import Card from "@components/Card";
import ScrollableText from "@components/ScrollableText";
import Button from "@components/Button";
import { terms } from "@/lib/utils/constants";
import { Link } from "react-router";
import { isMobile } from "@/lib/utils/isMobile";

function Terms() {
  const [hasReadTerms, setHasReadTerms] = useState(false);

  const handleScrollEnd = (reached) => {
    setHasReadTerms(reached);
  };

  return !isMobile() ? (
    <Card className="max-w-6xl gap-4 flex flex-col items-center shadow-2xl w-2/3">
      <div className="font-semibold flex flex-col items-start justify-start w-full">
        <h1 className="text-3xl text-accent">Términos y Condiciones</h1>
        <h2 className="text-xl text-secondary-text">Tu acuerdo</h2>
      </div>
      <div className="flex flex-col gap-12">
        <ScrollableText text={terms} onScrollEnd={handleScrollEnd} />
        <div className="flex justify-end w-full gap-8">
          <Link to={"/"} aria-label="Decline Terms and Conditions">
            <Button variant="underline" size={"md"} aria-label="Decline">
              Rechazar
            </Button>
          </Link>
          <Link
            to={hasReadTerms ? "/didit" : "#"}
            aria-label={
              hasReadTerms
                ? "Accept Terms and Conditions"
                : "Read all terms first"
            }
          >
            <Button
              variant={"primary"}
              size={"md"}
              aria-label="Accept"
              disabled={!hasReadTerms}
              className={!hasReadTerms ? "opacity-50 cursor-not-allowed" : ""}
            >
              {hasReadTerms ? "Continuar" : "Leer todos los términos"}
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
        onScrollEnd={handleScrollEnd}
      />
      <div className="flex justify-around w-full gap-8">
        <Link
          to={hasReadTerms ? "/didit" : "#"}
          aria-label={
            hasReadTerms
              ? "Accept Terms and Conditions"
              : "Read all terms first"
          }
        >
          <Button
            variant={"rounded"}
            size={"md"}
            aria-label="Accept"
            disabled={!hasReadTerms}
            className={!hasReadTerms ? "opacity-50 cursor-not-allowed" : ""}
          >
            {hasReadTerms ? "Aceptar & Continuar" : "Lea todos los términos"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Terms;
