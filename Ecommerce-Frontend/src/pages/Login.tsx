import { ChangeEvent, useState } from "react";
import Inputs from "../components/Inputs";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        _id: user.uid,
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        dob,
        role: "user",
      });

      if ("data" in res && res.data?.message) {
        toast.success(res.data?.message);
      }
      else{
        const error = res.error as FetchBaseQueryError
        const message = (error.data as MessageResponse).message
        toast.error(message);
      }

      console.log(user);
    } catch (error) {
      console.error(error); // Show the error in the console
      toast.error("Sign in fail");
    }
  };
  return (
    // Login
    <div className="h-[85vh] flex flex-col items-center justify-center ">
      <main className="w-full h-[90%] max-w-[350px] bg-white p-6 shadow-md flex flex-col items-stretch justify-center gap-4">
        <h1 className="tracking-wider text-xl uppercase font-light text-center">
          Login
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Country</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-400 outline-none text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <Inputs
            label={"Date of birth"}
            type={"Date"}
            value={dob}
            placeholder="Pin Code"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDob(e.target.value)
            }
          />
        </div>

        <div>
          <p className="text-center m-2 text-xs text-gray-600">
            Already Signed In Once
          </p>
          <button
            onClick={loginHandler}
            className="flex gap-2 items-center justify-center bg-blue-600 w-full py-2 rounded-md text-white hover:bg-blue-500 duration-200"
          >
            <FcGoogle className="bg-white w-5 h-full rounded-full" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
