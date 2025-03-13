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
      className="flex gap-12 items-start justify-center lg:justify-between lg:max-w-5xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 w-1/2">
        <img className="md:hidden w-full" src={mobileSvg} alt="" />
        <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">
          Bienvenido a la Experiencia Pagui
        </h1>
        {isMobile() ? (
          <p className="text-xl text-primary-text text-start mb-4">
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

      {!isMobile() && (
        <div className="md:flex flex-col gap-12 md:w-1/2 items-end hidden">
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
            <Button variant={"rounded"} size={"roundLg"} aria-label="Next">
              <MdNavigateNext className="w-8 h-8" />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default Home;
