import React from "react";
import Button from "@/components/Button";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router";
import { isMobile } from "@/lib/utils/isMobile";

function Error404() {
  return (
    <>
      <div className=" flex flex-col gap-2 items-center text-center">
        <h1 className="text-3xl text-primary font-bold">ERROR 404</h1>
        <h2 className="text-2xl text-secondary-text font-light">
          Parece que la pagina que buscas no existe...
        </h2>
      </div>
      <div className="flex w-full justify-end">
        <Link to={"/"} aria-label="Go to Home Page">
          <Button variant={"rounded"} size={isMobile() ? "roundMd" : "roundLg"} aria-label="Back">
            <FaHouse className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Error404;
