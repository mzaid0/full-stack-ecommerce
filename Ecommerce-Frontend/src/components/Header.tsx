import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { RiAlignItemVerticalCenterLine } from "react-icons/ri";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };
  return (
    // Header
    <nav className="flex justify-end items-center gap-6 w-full relative p-4">
      <Link className=" hover:text-cyan-700 duration-200 uppercase" to={"/"}>
        Home
      </Link>
      <Link className=" hover:text-cyan-700 duration-200" to={"/search"}>
        <FaSearch />
      </Link>
      <Link className=" hover:text-cyan-700 duration-200" to={"/cart"}>
        <FaCartShopping />
      </Link>
      {user?._id ? (
        <>
          <div className="group">
            <button className=" hover:text-cyan-700 duration-200">
              <FaUser />
            </button>
            <dialog
              open={true}
              className="border-solid border-[1px] border-gray-900 p-2 text-sm bg-gray-100 absolute top-10 left-custom-left rounded-md hidden group-hover:block "
            >
              <div className="flex flex-col justify-start items-start gap-2 ">
                {user.role === "admin" && (
                  <Link
                    className="flex items-center gap-1 p-1 rounded-lg  hover:bg-gray-300 duration-200"
                    to={"/admin/dashboard"}
                  >
                    <RiAdminFill /> Admin
                  </Link>
                )}
                <Link
                  className="flex items-center gap-1 p-1 rounded-lg  hover:bg-gray-300 duration-200"
                  to={"/orders"}
                >
                  <RiAlignItemVerticalCenterLine />
                  Orders
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 p-1 rounded-lg  hover:bg-gray-300 duration-200"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </dialog>
          </div>
        </>
      ) : (
        <Link className="hover:text-cyan-700 duration-200" to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
