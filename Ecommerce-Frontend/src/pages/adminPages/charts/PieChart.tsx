import AdminSidebar from "../../../components/adminComponents/AdminSidebar";
import { GenderChart, PieChart } from "../../../components/adminComponents/Charts";


const PieCharts = () => {
  const data = [
    {
      heading: "Shoes",
      value: 63,
    },
    {
      heading: "Tabs",
      value: 39,
    },
    {
      heading: "Mobile",
      value: 16,
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
      value: 49,
    },
  ];
  return (
    <div className="grid grid-cols-6 gap-2 ">
      <AdminSidebar />
      <main className="col-span-5 p-10 bg-white">
        <h1 className="mb-8 text-2xl font-bold uppercase">
          Pie & Doughnut Charts{" "}
        </h1>
        <section>
          <div className="w-[30%] mx-auto">
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className="text-center my-6 text-xl uppercase font-light">
            Order fulfillment ratio
          </h2>
        </section>

        <section>
          <div className="w-[30%] mx-auto">
            <GenderChart
              labels={data.map((item) => item.heading)}
              data={data.map((item) => item.value)}
              backgroundColor={data.map(
                ({ value }) => `hsl(${value * 4},${value * 2}%,50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2 className="text-center my-6 text-xl uppercase font-light">
            products category ratio
          </h2>
        </section>

        <section>
          <div className="w-[30%] mx-auto">
            <GenderChart
              labels={["In Stock", "Out of Stock"]}
              data={[50, 20]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53,162,255)"]}
              legends={false}
              offset={[0, 60]}
              cutout={"70%"}
            />
          </div>
          <h2 className="text-center my-6 text-xl uppercase font-light">
            stock availability
          </h2>
        </section>

        <section>
          <div className="w-[30%] mx-auto">
            <GenderChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Brunt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                `hsl(320,70%,40%)`,
                `hsl(12,90%,50%)`,
                `hsl(190,90%,40%)`,
                `hsl(420,80%,60%)`,
                `hsl(220,80%,70%)`,
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2 className="text-center my-6 text-xl uppercase font-light">
            Revenue distribution
          </h2>
        </section>

        <section>
          <div className="w-[30%] mx-auto">
            <PieChart
              labels={[
                "Teenager (Below 20)",
                "Adults (Between 20-40)",
                "Older (Above 40)",
              ]}
              data={[12, 90, 13]}
              backgroundColor={[
                `hsl(10,80%,80%)`,
                `hsl(10,80%,50%)`,
                `hsl(10,40%,50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className="text-center my-6 text-xl uppercase font-light">
            Users age group
          </h2>
        </section>

        <section>
          <div className="w-[30%] mx-auto">
            <GenderChart
              labels={["Admin", "Customers"]}
              data={[10, 60]}
              backgroundColor={["hsl(189,80%,40%)", "rgb(153,112,200)"]}
              offset={[0, 60]}
              cutout={"70%"}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
