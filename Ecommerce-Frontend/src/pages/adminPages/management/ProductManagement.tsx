import { ChangeEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";
import Inputs from "../../../components/Inputs";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../../types/api-types";
import { MdDelete } from "react-icons/md";

const server = "http://localhost:4000";

const ProductManagement = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (store: { userReducer: UserReducerInitialState }) => store.userReducer
  );
  const params = useParams();

  const { data } = useProductDetailsQuery(params.id!);

  const { price, photo, name, stock, category } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result); // Set photo for preview
          setPhotoFile(file); // Save the file for form submission
        }
      };
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    // Submit formData to your backend API here
    const res = await updateProduct({
      formData,
      userId: user!._id!,
      productId: data!.product!._id!,
    });

    if ("data" in res) {
      toast.success(res.data?.message as string);
      navigate("/admin/products");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = error.data as MessageResponse;
      toast.error(message.message);
    }
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user!._id!,
      productId: data!.product!._id!,
    });

    if ("data" in res) {
      toast.success(res.data?.message as string);
      navigate("/admin/products");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = error.data as MessageResponse;
      toast.error(message.message);
    }
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setPriceUpdate(data.product.price);
      setPhotoUpdate(data.product.photo); // Set the initial photo
    }
  }, [data]);

  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      {/* Product Management */}
      <main className="col-span-5 h-full flex gap-10 items-center justify-center">
        <section className="overflow-auto relative p-6 h-[90%] bg-white py-2 w-full max-w-sm rounded-md shadow-md">
          <h2 className="tracking-wider text-sm text-gray-600">
            ID - {data?.product._id}
          </h2>
          <img
            className="object-contain h-[75%] w-full"
            src={`${server}/${photoUpdate}`}
            alt="Product"
          />
          <p className="tracking-wider text-sm text-gray-600 text-center uppercase">
            {nameUpdate}
          </p>
          {stockUpdate > 0 ? (
            <span className="text-sm text-green-500 absolute top-2 right-6">
              {stockUpdate} Available
            </span>
          ) : (
            <span className="text-sm text-red-500 absolute top-2 right-6">
              Not Available
            </span>
          )}
          <p className="font-bold text-2xl text-center">$ {priceUpdate}</p>
        </section>
        <article className="h-[90%] bg-white py-2 w-full max-w-sm rounded-md shadow-md relative">
          <button
            onClick={deleteHandler}
            className="absolute -top-4 -right-4 text-blue-800 bg-blue-300 p-1 rounded-full hover:text-red-500 duration-200 hover:bg-red-200"
          >
            <MdDelete size={30} />
          </button>
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center gap-4"
          >
            <h2 className="tracking-wider text-xl uppercase font-light text-center">
              Manage
            </h2>
            <div className="flex flex-col gap-3 justify-center">
              <div className="flex flex-col gap-1">
                <Inputs
                  label="Name"
                  type="text"
                  value={nameUpdate}
                  placeholder="Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNameUpdate(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Inputs
                  label="Price"
                  type="number"
                  value={priceUpdate}
                  placeholder="Price"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceUpdate(Number(e.target.value))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Inputs
                  label="Stock"
                  type="number"
                  value={stockUpdate}
                  placeholder="Stock"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setStockUpdate(Number(e.target.value))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Inputs
                  label="Category"
                  type="text"
                  value={categoryUpdate}
                  placeholder="Category"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCategoryUpdate(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-1 items-center">
                <label className="text-xs">Photo</label>
                <input type="file" onChange={changeImageHandler} />
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-500 duration-200"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
