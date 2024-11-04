import { ChangeEvent, useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { cartItems } = useSelector(
    (store: { cartReducer: CartReducerInitialState }) => store.cartReducer
  );

  const navigate = useNavigate();

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [pinCode, setPinCode] = useState<number>();

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/cart");
    }
  }, [cartItems]);

  return (
    <>
      <div className="">
        <main className=" h-full w-full flex justify-center ">
          <article className="h-[80%]  py-2 w-full max-w-lg rounded-md">
            <form className="flex flex-col items-center gap-4 p-2">
              <h2 className="tracking-wider text-xl uppercase font-light text-center">
                Shipping Address
              </h2>
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex flex-col gap-1">
                  <Inputs
                    label={"Address"}
                    type={"text"}
                    value={address}
                    placeholder="Address"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Inputs
                    label={"City"}
                    type={"number"}
                    value={city}
                    placeholder="City"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Inputs
                    label={"State"}
                    type={"number"}
                    value={state}
                    placeholder="State"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setState(e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-400 outline-none text-sm"
                  >
                    <option value="">Select a country</option>
                    <option value="pakistan">Pakistan</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <Inputs
                    label={"Pin Code"}
                    type={"number"}
                    value={pinCode}
                    placeholder="Pin Code"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPinCode(Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-500 duration-200"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </form>
          </article>
        </main>
      </div>
    </>
  );
};

export default NewProduct;
