import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },{
    Header: "Status",
    accessor: "status",
  },{
    Header: "Action",
    accessor: "action"
  }
];

const data:DataType[] = [
    {
        _id: "1",
        amount: 100,
        quantity: 2,
        discount: 5,
        status: <span className="text-green-500">Delivered</span>,
        action: <Link to={`/order/1`}>View</Link>
    },
    {
        _id: "2",
        amount: 200,
        quantity: 3,
        discount: 10,
        status: <span className="text-red-500">Pending</span>,
        action: <Link to={`/order/2`}>View</Link>
    },{
        _id: "1",
        amount: 100,
        quantity: 2,
        discount: 5,
        status: <span className="text-green-500">Delivered</span>,
        action: <Link to={`/order/1`}>View</Link>
    },
    {
        _id: "2",
        amount: 200,
        quantity: 3,
        discount: 10,
        status: <span className="text-red-500">Pending</span>,
        action: <Link to={`/order/2`}>View</Link>
    },{
        _id: "1",
        amount: 100,
        quantity: 2,
        discount: 5,
        status: <span className="text-green-500">Delivered</span>,
        action: <Link to={`/order/1`}>View</Link>
    },
    {
        _id: "2",
        amount: 200,
        quantity: 3,
        discount: 10,
        status: <span className="text-red-500">Pending</span>,
        action: <Link to={`/order/2`}>View</Link>
    },{
        _id: "1",
        amount: 100,
        quantity: 2,
        discount: 5,
        status: <span className="text-green-500">Delivered</span>,
        action: <Link to={`/order/1`}>View</Link>
    },
    {
        _id: "2",
        amount: 200,
        quantity: 3,
        discount: 10,
        status: <span className="text-red-500">Pending</span>,
        action: <Link to={`/order/2`}>View</Link>
    }
]
const Orders = () => {
    const Table = TableHOC<DataType>(
        columns,
        data,
        "Orders",
        data.length>7
    )()
  return <div className="w-3/4 mx-auto">
    <h1 className="tracking-wider text-2xl uppercase font-light ">My Orders</h1>
    {Table}
  </div>;
};

export default Orders;
