
import "../styles/tailwind.css";
import logo from "../assets/pagui-logo.png";
import vector1 from "../assets/pagui-vector-1.svg";
import vector2 from "../assets/pagui-vector-2.svg";
import Card from "../components/Card";
import { Outlet } from "react-router";
import { Link } from "react-router";

function Layout() {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white overflow-hidden relative">
        <img
          src={vector1}
          alt="Pagui Vector"
          className="absolute -top-24 z-0 left-0 w-1/5"
        />

        <img
          src={vector2}
          alt="Pagui Vector"
          className="absolute -bottom-8 z-0 right-0 w-1/3"
        />

        <Card className="w-fit py-12 justify-around z-10  bg-white/80 backdrop-blur-xl shadow-2xl shadow-drop-shadow rounded-xl ">
          <div className="flex flex-col gap-8 items-start w-full">
            <Link to="/">
              <img className="w-24" src={logo} alt="Pagui Logo" />
            </Link>
            <Outlet />
          </div>
        </Card>
      </div>
    );
}

export default Layout;
