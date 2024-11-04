import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor(timeInSeconds / 3600 / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalID: number;
    if (isRunning) {
      intervalID= setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);  
    } 

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };
  return (
    <div className="grid grid-cols-6 gap-2 ">
      <AdminSidebar />
      <main className="col-span-5 bg-white px-16 py-8 ">
        <h2 className="mb-8 text-3xl font-bold uppercase">Stop Watch</h2>
        <section className="flex items-center justify-center gap-6 ">
          {/* Stop-Watch */}
          <div>
            <h2 className="text-3xl font-light text-center">
              {formatTime(time)}
            </h2>
            <button
              className="bg-blue-600 px-6 font-medium m-4 py-2 text-white rounded-md hover:bg-blue-700 duration-200"
              onClick={() => setIsRunning((prev) => !prev)}
            >
              {isRunning?"Stop":"Start"}
            </button>
            <button className="bg-red-600 px-6 font-medium m-4 py-2 text-white rounded-md hover:bg-red-700 duration-200" onClick={resetHandler}>
              Reset
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StopWatch;
