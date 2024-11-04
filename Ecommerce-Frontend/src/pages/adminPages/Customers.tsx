import { ReactElement, useCallback, useState } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import avatar1 from "../../assets/images/avatar1.png"
import avatar2 from "../../assets/images/avatar2.png"
import avatar3 from "../../assets/images/avatar3.png"
import avatar4 from "../../assets/images/avatar4.webp"
import avatar5 from "../../assets/images/avatar5.png"
import avatar6 from "../../assets/images/avatar6.png"
import avatar7 from "../../assets/images/avatar7.webp"
import avatar8 from "../../assets/images/avatar8.png"
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import TableHOC from "../../components/TableHOC";
interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar1} alt="avatar" />,
    name: "John Doe",
    email: "johndoe@example.com",
    gender: "Male",
    role: "Admin",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar2} alt="avatar" />,
    name: "Jane Doe",
    email: "janedoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar3} alt="avatar" />,
    name: "Alice Doe",
    email: "alice@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar4} alt="avatar" />,
    name: "Bob Doe",
    email: "bobdoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar5} alt="avatar" />,
    name: "Charlie Doe",
    email: "charlie@example.com",
    gender: "Female",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar6} alt="avatar" />,
    name: "David Doe",
    email: "daviddoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar7} alt="avatar" />,
    name: "Emily Doe",
    email: "emilydoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
  {
    avatar: <img className="h-10 w-10 object-contain rounded-full" src={avatar8} alt="avatar" />,
    name: "Frank Doe",
    email: "frankdoe@example.com",
    gender: "Male",
    role: "User",
    action: (
      <Link
        className="bg-red-400 px-2 py-1 rounded-xl text-white hover:bg-red-600 duration-200"
        to="/admin/dashboard"
      >
        Delete
      </Link>
    ),
  },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Table = useCallback(
    TableHOC<DataType>(columns, data, "Customers", true),
    []
  );
  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      <div className="col-span-5">{Table()}</div>
    </div>
  );
};

export default Customers;
