
import AdminSidebar from "../../../components/adminComponents/AdminSidebar"
import { LineChart } from "../../../components/adminComponents/Charts"


const LineCharts = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]
  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      <main className="col-span-5 bg-white px-10 py-8 overflow-y-auto">
      <h2 className="mb-8 text-3xl font-bold uppercase">Line Charts</h2>
        <section className="w-[80%] mx-auto">
          <LineChart
            data={[200, 444, 343, 556, 778, 455, 990,623,433, 655, 271, 755]}
            label="Users"
            borderColor="rgb(53,162,255)"
            backgroundColor="rgba(53,162,255,0.5)"
            labels={months}
          />
          <h2 className="text-center my-6 text-xl uppercase font-light">Active Users </h2>
        </section>


        <section className="w-[80%] mx-auto">
          <LineChart
            data={[30, 44, 24,35, 48, 35,90,23,53,355, 71, 45]}
            label="Products"
            borderColor="rgb(153,162,255)"
            backgroundColor="rgba(153,162,255,0.5)"
            labels={months}
          />
          <h2 className="text-center my-6 text-xl uppercase font-light">Total Products (SKU) </h2>
        </section>

        <section className="w-[80%] mx-auto">
          <LineChart
            data={[20230, 41344, 34324, 55635, 77248, 35135, 31590,64623,43253, 65355, 23571, 75245]}
            label="Revenue"
            borderColor="rgb(253,162,255)"
            backgroundColor="rgba(253,162,255,0.5)"
            labels={months}
          />
          <h2 className="text-center my-6 text-xl uppercase font-light">Total Revenue</h2>
        </section>

        <section className="w-[80%] mx-auto">
          <LineChart
            data={[2230, 4134, 3432, 5563, 7724, 3513, 3159,6462,4325, 6535, 2571, 7545]}
            label="Discount"
            borderColor="rgb(123,102,115)"
            backgroundColor="rgba(123,102,115,0.5)"
            labels={months}
          />
          <h2 className="text-center my-6 text-xl uppercase font-light">Discount Allotted</h2>
        </section>
      </main>
    </div>
  )
}

export default LineCharts