
import userImage from "../../assets/images/userImage.webp";
import { FaRegBell } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { BiMaleFemale } from "react-icons/bi";
import Table from "../../components/adminComponents/DashboardTable"
import { BarChart, GenderChart } from "../../components/adminComponents/Charts";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";

const Dashboard = () => {
  const data = [
    {
      heading: "Mobile",
      value: 56,
    },
    {
      heading: "Laptop",
      value: 86,
    },
    {
      heading: "Shoes",
      value: 73,
    },
    {
      heading: "Tabs",
      value: 29,
    },
    {
      heading: "Mobile",
      value: 56,
    },
    {
      heading: "Laptop",
      value: 86,
    },
    {
      heading: "Shoes",
      value: 73,
    },
    {
      heading: "Tabs",
      value: 29,
    },
  ];
  const tableData = [
    {
      id: "6",
      quantity: 4,
      amount: 4000,
      discount: 10,
      status: "Shipped",
    },
    {
      id: "7",
      quantity: 5,
      amount: 5000,
      discount: 15,
      status: "Delivered",
    },
    {
      id: "8",
      quantity: 6,
      amount: 6000,
      discount: 20,
      status: "Canceled",
    },
    {
      id: "2",
      quantity: 7,
      amount: 7000,
      discount: 25,
      status: "Returned",
    },
    {
      id: "6",
      quantity: 4,
      amount: 4000,
      discount: 20,
      status: "Shipped",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-6 gap-2  ">
        <AdminSidebar />
        <main className=" col-span-5 ">
          {/* Bar */}
          <section className="h-16 flex items-center border-b-2 px-8 ">
            <BsSearch />
            <input
              className="mr-auto px-4 outline-none w-full bg-inherit"
              type="text"
              placeholder="Search for data, users, docs"
            />
            <span className="text-lg mr-2">
              <FaRegBell />
            </span>
            <img
              className="h-6 w-6 object-cover rounded-full"
              src={userImage}
              alt="user"
            />
          </section>

          {/* Widget-Container */}
          <section className="flex items-stretch justify-between gap-8 px-8 pt-4">
            <WidgetItem
              heading="Revenue"
              percentage={40}
              amount={true}
              value={34000}
              color="rgb(0,115,200)"
            />
            <WidgetItem
              heading="Users"
              percentage={-14}
              value={400}
              color="rgb(0 198 202)"
            />
            <WidgetItem
              heading="Transactions"
              percentage={80}
              value={24000}
              color="rgb(255 196 0)"
            />
            <WidgetItem
              heading="Products"
              percentage={30}
              value={1000}
              color="rgb(76,0,255)"
            />
          </section>

          {/* Graph-Container */}
          <section className="flex gap-4 py-4 px-8">
            {/* Revenue-Chart */}
            <div className="bg-white rounded-md w-full py-4 px-8">
              <h2 className="uppercase font-light text-lg tracking-wider text-center">
                Revenue & Transactions
              </h2>
              <BarChart
                data_2={[300, 144, 455, 655, 237, 755, 190]}
                data_1={[200, 444, 343, 556, 778, 455, 990]}
                title_1="Revenue"
                title_2="Transactions"
                bgColor_1="rgb(0 110 255)"
                bgColor_2="rgba(53,162,235,0.7)"
              />
            </div>
            {/* Dashboard-Categories */}
            <div className="bg-white rounded-md w-full max-w-48 flex flex-col items-center justify-center pb-4">
              <h2 className="uppercase font-light text-lg tracking-wider text-center">
                Inventory
              </h2>
              <div className="overflow-y-auto">
                {data.map((item) => (
                  <CategoryItem
                    key={item.heading}
                    heading={item.heading}
                    value={item.value}
                    color={`hsl(${item.value * 4}, ${item.value}%, 50%)`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Transaction-Container */}
          <section className="flex gap-8 px-8 py-4 h-80">
            {/* Gender-Chart */}
            <div className="bg-white rounded-lg flex items-center justify-center flex-col gap-4 shadow-md w-full max-w-56 relative">
              <h2 className="uppercase font-light text-lg tracking-wider text-center">
                Gender Ratio
              </h2>
              {/* Chart */}
              <GenderChart
                labels={["Male", "Female"]}
                data={[14, 19]}
                backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                cutout={70}
              />
              <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-gray-600 text-2xl">
                <BiMaleFemale />
              </p>
            </div>
            {/* Table */}
            <Table data={tableData} />
          </section>
        </main>
      </div>
    </>
  );
};

interface widgetItemsProps {
  heading: string;
  value: number;
  percentage: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percentage,
  color,
  amount = false,
}: widgetItemsProps) => (
  // Widget
  <article className="w-48 bg-white shadow-md p-4 flex items-center justify-between rounded-md">
    {/* Widget-info */}
    <div className=" ">
      <p className="font-light text-sm">{heading}</p>
      <h4 className="font-bold text-lg">{amount ? `$${value}` : value}</h4>
      {percentage > 0 ? (
        <span className="text-green-400 text-sm flex items-center">
          <HiTrendingUp />+{percentage}
        </span>
      ) : (
        <span className="text-red-400 flex text-sm items-center">
          <HiTrendingDown />
          {percentage}
        </span>
      )}
    </div>

    {/* Widget-circle */}
    <div className="h-16 w-16 flex items-center justify-center">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: color,
          pathColor: color,
          trailColor: "#d6d6d6",
          textSize: "20px",
        })}
      />
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  heading: string;
  value: number;
}

const CategoryItem = ({ color, heading, value }: CategoryItemProps) => (
  <div className="flex justify-between items-center  gap-2 p-4">
    <h5 className="text-xs font-light">{heading}</h5>
    <div className="ml-auto w-20 h-2 bg-gray-300 rounded-full flex-none overflow-hidden">
      <div
        className="h-full"
        style={{ backgroundColor: color, width: `${value}%` }}
      ></div>
    </div>
    <span className="text-xs font-bold">{value}%</span>
  </div>
);

export default Dashboard;
