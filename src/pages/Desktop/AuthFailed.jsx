import React from "react";
import Button from "@components/Button";
import { MdNavigateBefore } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router";
import { isMobile } from "@/lib/utils/isMobile";

function AuthFailed() {
  return (
    <>
      <div className=" flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl lg:text-3xl text-primary font-bold">
          ALGO SALIÓ MAL...
        </h1>
        <h2 className="text-xl lg:text-2xl text-secondary-text font-light">
          ¿No eres tú? Contacta al soporte técnico de Pagui
        </h2>
      </div>
      <div className="flex w-full justify-between items-center absolute lg:relative bottom-0">
        <Link to={"/didit"} aria-label="Retry Authentication">
          <Button
            variant={"rounded"}
            size={isMobile() ? "roundMd" : "roundLg"}
            aria-label="Back"
          >
            <MdNavigateBefore className="w-8 h-8" />
          </Button>
        </Link>
        <Link
          to={"https://pagui.co/"}
          target="_blank"
          aria-label="Contact Technical Support"
        >
          <Button variant={"underline"} aria-label="Soporte">
            SOPORTE TÉCNICO
          </Button>
        </Link>
        <Link to={"/"} aria-label="Go to Home Page">
          <Button
            variant={"rounded"}
            size={isMobile() ? "roundMd" : "roundLg"}
            aria-label="Next"
          >
            <FaHouse className="w-8 h-8" />
          </Button>
        </Link>
      </div>
    </>
  );
}

export default AuthFailed;
