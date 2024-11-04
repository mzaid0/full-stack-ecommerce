
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";
import { BarChart } from "../../../components/adminComponents/Charts";

const BarCharts = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    
  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      {/* Chart-Container */}
      <main className="col-span-5 bg-white px-16 py-8 overflow-y-auto">
        <h2 className="mb-8 text-3xl font-bold uppercase">Bar Charts</h2>
        <section className="w-[80%] mx-auto">
          <BarChart
            data_1={[200, 444, 343, 556, 778, 455, 990]}
            data_2={[300, 144, 433, 655, 271, 755, 190]}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(260,90%,90%)`}
          />
          <h2 className="text-center my-6 text-xl uppercase font-light">Top selling products & top customers</h2>
        </section>

        <section className="w-[80%] mx-auto">
          <BarChart
            data_1={[200, 444, 343, 556, 778, 455, 990,827,637,237,893,628]}
            data_2={[]}
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(890,50%,40%)`}
            bgColor_2={""}
            horizontal={true}
            labels={months}
          />
          <h2  className="text-center my-6 text-xl uppercase font-light">Orders through the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
