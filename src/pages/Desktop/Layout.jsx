import logo from "@assets/pagui-logo.png";
import vector1 from "@assets/pagui-vector-1.svg";
import vector2 from "@assets/pagui-vector-2.svg";
import Card from "@components/Card";
import { Outlet } from "react-router";
import { Link } from "react-router";

import "@styles/tailwind.css";

function Layout() {
  return (
    <div className="h-dvh w-full flex items-center justify-center bg-white overflow-hidden relative font-poppins">
      <img
        src={vector1}
        alt="Pagui Vector"
        className="absolute -top-24 z-0 left-0 w-1/5"
        width="200"
        height="200"
      />

      <img
        src={vector2}
        alt="Pagui Vector"
        className="absolute -bottom-8 z-0 right-0 w-1/3"
        width="300"
        height="300"
      />
      <Card className="w-2/3 min-h-4/5 py-12 flex flex-col z-10 bg-white/80 backdrop-blur-xl shadow-2xl shadow-drop-shadow rounded-xl">
        <div className="flex flex-col gap-8 items-start w-full flex-1">
          <Link to="/" aria-label="Go to Home Page">
            <img
              className="w-24"
              src={logo}
              alt="Pagui Logo"
              width="96"
              height="96"
            />
          </Link>
          <div className="flex flex-col justify-center items-center w-full  flex-1">
            <Outlet />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Layout;
