import "@styles/tailwind.css";

import React from "react";
import Card from "@components/Card";
import ScrollableText from "@components/ScrollableText";
import Button from "@components/Button";
import { terms } from "@/lib/utils/constants";
import { Link } from "react-router";

function Terms() {
  return (
    <Card className="max-w-6xl gap-4 flex flex-col items-center shadow-2xl w-2/3">
      <div className="font-semibold flex flex-col items-start justify-start w-full">
        <h1 className="text-3xl text-accent ">Terms and Conditions</h1>
        <h2 className="text-xl text-secondary-text ">Your Agreement</h2>
      </div>
      <div className="flex flex-col gap-12">
        <ScrollableText text={terms} />

        <div className="flex justify-end w-full gap-8">
          <Link to={"/"} aria-label="Decline Terms and Conditions">
            <Button variant="underline" size={"md"} aria-label="Decline">
              Decline
            </Button>
          </Link>
          <Link to={"/didit"} aria-label="Accept Terms and Conditions">
            <Button variant={"primary"} size={"md"} aria-label="Accept">
              Accept
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Terms;
