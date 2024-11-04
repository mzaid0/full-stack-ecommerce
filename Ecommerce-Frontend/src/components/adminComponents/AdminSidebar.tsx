import { NavLink, useLocation, Location } from "react-router-dom";
import {
  RiDashboardFill,
  RiShoppingBag3Fill,
  RiCoupon3Fill,
} from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaStopwatch,
} from "react-icons/fa";
import { IconType } from "react-icons";

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside className="bg-white h-screen ">
      <h1 className="mx-2 my-3 font-bold text-xl">Logo.</h1>
      <DashboardDiv location={location} />
      <ChartsDiv location={location} />
      <GamesDiv location={location} />
    </aside>
  );
};

const DashboardDiv = ({ location }: { location: Location }) => (
  <div>
    <h2 className="font-light text-sm mx-6 uppercase">Dashboard</h2>
    <ul className="mx-4 my-2">
      <Li
        text={"Dashboard"}
        url={"/admin/dashboard"}
        location={location}
        Icon={RiDashboardFill}
      />
      <Li
        text={"Products"}
        url={"/admin/products"}
        location={location}
        Icon={RiShoppingBag3Fill}
      />
      <Li
        text={"Customers"}
        url={"/admin/customers"}
        location={location}
        Icon={IoIosPeople}
      />
      <Li
        text={"Transaction"}
        url={"/admin/transaction"}
        location={location}
        Icon={AiFillFileText}
      />
    </ul>
  </div>
);

const ChartsDiv = ({ location }: { location: Location }) => (
  <div>
    <h2 className="font-light text-sm mx-6 uppercase">Charts</h2>
    <ul className="mx-4 my-2 ">
      <Li
        text={"Bar"}
        url={"/admin/chart/bar"}
        location={location}
        Icon={FaChartBar}
      />
      <Li
        text={"Pie"}
        url={"/admin/chart/pie"}
        location={location}
        Icon={FaChartPie}
      />
      <Li
        text={"Line"}
        url={"/admin/chart/line"}
        location={location}
        Icon={FaChartLine}
      />
    </ul>
  </div>
);

const GamesDiv = ({ location }: { location: Location }) => (
  <div>
    <h2 className="font-light text-sm mx-6 uppercase">Apps</h2>
    <ul className="mx-4 my-2   ">
      <Li
        text={"Stop Watch"}
        url={"/admin/app/stopwatch"}
        location={location}
        Icon={FaStopwatch}
      />
      <Li
        text={"Coupon"}
        url={"/admin/app/coupon"}
        location={location}
        Icon={RiCoupon3Fill}
      />
    </ul>
  </div>
);

interface LiProps {
  text: string;
  url: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ text, url, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? "rgba(0,115,255,0.1)"
        : "white",
    }}
    className=" px-2 py-[10px] text-xs rounded-lg opacity-85 "
  >
    <NavLink
      to={url}
      style={{
        color: location.pathname.includes(url) ? "rgb(0,115,255)" : "black",
      }}
      className="flex items-center gap-2"
    >
      <Icon />
      {text}
    </NavLink>
  </li>
);
export default AdminSidebar;