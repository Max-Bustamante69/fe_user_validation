import Button from "@components/Button";
import Card from "@components/Card";
import { Link } from "react-router";
import { MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";

import mobileSvg from "@assets/pagui-home-mobile.svg";
import { isMobile } from "@/lib/utils/isMobile";

function Home() {
  return (
    <motion.div
      className="flex gap-6 lg:flex-row flex-col items-center lg:gap-12 lg:items-start h-full w-full justify-start lg:justify-between lg:max-w-5xl relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-around gap-12 w-full max-w-sm">
        <img className="lg:hidden max-w-3/4 w-full" src={mobileSvg} alt="" width="300" height="300" />
        <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-2 tracking-tight">
          
          Bienvenido a la Experiencia Pagui
        </h1>
        {isMobile() ? (
          <p className="text-lg lg:text-xl text-primary-text text-start mb-4">
            Pagui es el mejor canal para facilitar tus compras de manera ágil, sencilla y segura a través de WhatsApp.
          </p>
        ) : (
          <>
            <p className="text-xl text-primary-text text-start mb-4">
              Verifica desde WhatsApp cuándo recibes pagos por QR, transferencias ó llaves, sin la necesidad de entrar al banco.
            </p>
            <p className="text-xl text-primary-text text-start">
              Olvídate de tomarle fotos a capturas de pantalla, tus vendedores podrán confirmar las ventas en tiempo real a través de WhatsApp de manera segura.
            </p>
          </>
        )}
        </div>
      </div>

      {!isMobile() ? (
        <div className="lg:flex flex-col gap-12 lg:2/3  items-end hidden">
          <Card className="justify-center items-center bg-white w-full shadow-xl p-6 ">
            <ul className="text-lg flex flex-col text-secondary-text justify-center gap-4 list-disc">
              <li className="mb-4">
                Otorga acceso restringido a tus vendedores para confirmar cada venta sin necesidad de compartir información de tus cuentas bancarias.
              </li>
              <li className="mb-4">
                Agiliza la confirmación de pagos de tus compradores.
              </li>
              <li className="mb-4">
                Concilia de forma fácil los ingresos en el banco con tus facturas.
              </li>
              <li className="mb-4">
                Evita aceptar comprobantes falsos de pagos.
              </li>
            </ul>
          </Card>
          <Link to={"/terms"} aria-label="Read Terms and Conditions">
            <Button variant={"rounded"} size={isMobile() ? "roundMd" : "roundLg"} aria-label="Next">
              <MdNavigateNext className="w-8 h-8" />
            </Button>
          </Link>
        </div>
      ) : (
        <Link className="w-full flex justify-end absolute bottom-0" to={"/terms"} aria-label="Read Terms and Conditions">
          <Button variant={"rounded"} size={isMobile() ? "roundMd" : "roundLg"} aria-label="Next">
            <MdNavigateNext className="w-8 h-8" />
          </Button>
        </Link>
      )}
    </motion.div>
  );
}

export default Home;
