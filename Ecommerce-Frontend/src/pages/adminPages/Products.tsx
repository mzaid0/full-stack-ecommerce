import { ReactElement, useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import TableHOC from "../../components/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const server = "http://localhost:4000";
const Products = () => {
  const { user } = useSelector(
    (store: { userReducer: UserReducerInitialState }) => store.userReducer
  );

  const { data, isError, error } = useAllProductsQuery(user!._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) toast.error((error as CustomError).data.message);

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((product) => ({
          // Ensuring unique keys for each product row
          key: product._id,
          photo: (
            <img
              className="h-10 w-10 object-contain"
              src={`${server}/${product.photo}`}
              alt={product.name}
            />
          ),
          name: product.name,
          price: product.price,
          stock: product.stock,
          action: (
            <Link
              className="bg-blue-400 px-2 py-1 rounded-xl text-white hover:bg-blue-600 duration-200"
              to={`/admin/products/${product._id}`}
            >
              Manage
            </Link>
          ),
        }))
      );
    }
  }, [data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Table = useCallback(
    TableHOC<DataType>(columns, rows, "Products", true),
    [rows] // Add rows as a dependency to update the table dynamically
  );

  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      <div className="col-span-5 text-sm">{Table()}</div>
      <Link
        className="fixed right-8 top-2 bg-green-400 p-2 text-sm rounded-full text-white hover:bg-green-600 duration-200"
        to="/admin/product/new"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
