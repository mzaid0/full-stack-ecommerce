import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "0123456789";
const allSymbols = "@#$%^&*+^()/_-";
const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [isIncludeNumber, setIsIncludeNumber] = useState<boolean>(false);
  const [isIncludeCharacters, setIsIncludeCharacters] =
    useState<boolean>(false);
  const [isIncludeSymbols, setIsIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!isIncludeNumber && !isIncludeCharacters && !isIncludeSymbols) {
      return alert("Please select at least one Include !");
    }
    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (isIncludeNumber) entireString += allNumbers;
      if (isIncludeCharacters) entireString += allLetters;
      if (isIncludeSymbols) entireString += allSymbols;
      const randomNum = Math.floor(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setCoupon(result);
  };
  return (
    <div className="grid grid-cols-6 gap-2 ">
      <AdminSidebar />
      <main className="col-span-5 bg-white px-16 py-8 ">
        <h2 className="mb-8 text-3xl font-bold uppercase">Coupon</h2>
        <section className="flex flex-col items-center justify-center gap-10 ">
          {/* Coupon */}
          <form
            onSubmit={submitHandler}
            className="flex items-center flex-col gap-4 w-full max-w-xs"
          >
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-400 outline-none text-sm"
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
              className="w-full px-4 py-2 rounded-md border border-gray-400 outline-none text-sm"
              type="number"
              placeholder="Coupon length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset className="border border-slate-400 p-4 rounded-md ">
              <legend className="text-sm text-gray-600">Include</legend>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={isIncludeNumber}
                    onChange={() => setIsIncludeNumber((prev) => !prev)}
                  />
                  <span>Numbers</span>
                </div>

                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={isIncludeCharacters}
                    onChange={() => setIsIncludeCharacters((prev) => !prev)}
                  />
                  <span>Characters</span>
                </div>

                <div className="flex gap-1">
                  <input
                    type="checkbox"
                    checked={isIncludeSymbols}
                    onChange={() => setIsIncludeSymbols((prev) => !prev)}
                  />
                  <span>Symbols</span>
                </div>
              </div>
            </fieldset>
            <button
              className="px-4 py-2 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-500 duration-200"
              type="submit"
            >
              Generate coupon
            </button>
          </form>

          {coupon && (
            <code className="relative text-lg tracking-wide cursor-pointer">
              {coupon}{" "}
              <span
                className="opacity-0 bg-gray-700 text-white text-center rounded-md duration-100 w-full absolute top-0 left-0 hover:opacity-100"
                onClick={() => copyText(coupon)}
              >
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
