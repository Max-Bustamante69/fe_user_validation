import Card from "../components/Card";
import { MdNavigateNext } from "react-icons/md";

import "../styles/tailwind.css";

function Home() {
  return (
    <div className="flex gap-12 items-start justify-between lg:max-w-5xl">
      <div className="flex flex-col gap-4 w-1/2">
        <h1 className="text-3xl font-bold text-primary mb-2 tracking-tight">
          Bienvenido a la Experiencia Pagui
        </h1>
        <p className="text-xl text-primary-text text-start mb-4">
          Verifica desde WhatsApp cuándo recibes pagos por QR, transferencias ó
          llaves, sin la necesidad de entrar al banco.
        </p>
        <p className="text-xl text-primary-text text-start">
          Olvídate de tomarle fotos a capturas de pantalla, tus vendedores
          podrán confirmar las ventas en tiempo real a través de WhatsApp de
          manera segura.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:w-1/2 items-end">
        <Card className="justify-center items-center bg-white w-full shadow-xl p-6">
          <ul className="text-lg  flex flex-col text-secondary-text justify-center gap-4 list-disc ">
            <li className="   mb-4">
              Otorga acceso restringido a tus vendedores para confirmar cada
              venta sin necesidad de compartir información de tus cuentas
              bancarias.
            </li>
            <li className="   mb-4">
              Agiliza la confirmación de pagos de tus compradores.
            </li>
            <li className="   mb-4">
              Concilia de forma fácil los ingresos en el banco con tus facturas.
            </li>
            <li className="   mb-4">
              Evita aceptar comprobantes falsos de pagos.
            </li>
          </ul>
        </Card>
        <button className="bg-accent text-white rounded-full font-extrabold text-lg h-16 w-16 mt-4 flex flex-col items-center justify-center">
          <MdNavigateNext className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default Home;
