import { ReactElement, useCallback, useState } from "react";

import { Column } from "react-table";

import { Link } from "react-router-dom";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import TableHOC from "../../components/TableHOC";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
  action:ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  }
];

const arr:DataType[] = [
  {
  user: "John Doe",
  amount: 2000,
  discount: 100,
  quantity: 10,
  status: "Completed",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Jane Doe",
  amount: 3000,
  discount: 150,
  quantity: 8,
  status: "Cancelled",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Alice Doe",
  amount: 4000,
  discount: 200,
  quantity: 6,
  status: "Shipped",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Bob Doe",
  amount: 5000,
  discount: 250,
  quantity: 4,
  status: "Returned",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Charlie Doe",
  amount: 6000,
  discount: 300,
  quantity: 2,
  status: "Delivered",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "David Doe",
  amount: 7000,
  discount: 350,
  quantity: 1,
  status: "Canceled",
  action: <Link className="bg-blue-400  text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Emily Doe",
  amount: 8000,
  discount: 400,
  quantity: 3,
  status: "Shipped",
  action: <Link className="bg-blue-400 px-2 py-1 text-xs rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
},{
  user: "Frank Doe",
  amount: 9000,
  discount: 450,
  quantity: 5,
  status: "Delivered",
  action: <Link className="bg-blue-400 text-xs px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200" to="/admin/transaction/jshsnd">Manage</Link>
}
]

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Table = useCallback(
    TableHOC<DataType>(columns, data, "Transaction",true),[]
  )
  return (
    <div className="grid grid-cols-6 gap-2">
        <AdminSidebar />
        <div className="col-span-5">{Table()}</div>
      </div>
  )
}

export default Transaction