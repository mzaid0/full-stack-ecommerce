import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";
import Inputs from "../../../components/Inputs";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../../types/api-types";

const NewProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [category, setCategory] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [newProduct] = useNewProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setPhoto(file); // Save the file directly
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !stock || !category || !photo) {
      toast.error("Please fill all fields, including the photo");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("category", category);
    formData.append("photo", photo); // Append the file directly

    const res = await newProduct({ id: user!._id!, formData });

    if ("data" in res) {
      toast.success(res.data?.message as string);
      navigate("/admin/products");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = error.data as MessageResponse;
      toast.error(message.message);
    }
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      <AdminSidebar />
      <main className="col-span-5 h-full flex items-center justify-center">
        <article className="h-[90%] bg-white py-2 w-full max-w-lg rounded-md shadow-md">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center gap-4 p-4"
          >
            <h2 className="tracking-wider text-xl uppercase font-light text-center">
              New Product
            </h2>
            <div className="flex flex-col gap-3 justify-center">
              <Inputs
                label={"Name"}
                type={"text"}
                value={name}
                placeholder="Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Inputs
                label={"Price"}
                type={"number"}
                value={price}
                placeholder="Price"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrice(Number(e.target.value))
                }
              />
              <Inputs
                label={"Stock"}
                type={"number"}
                value={stock}
                placeholder="Stock"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setStock(Number(e.target.value))
                }
              />
              <Inputs
                label={"Category"}
                type={"text"}
                value={category}
                placeholder="Category"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <div className="flex flex-col gap-1 items-center">
                <label className="text-xs">Photo</label>
                <input type="file" onChange={changeImageHandler} />
                {photo && (
                  <img
                    className="h-12 w-12 object-cover"
                    src={URL.createObjectURL(photo)}
                    alt="Product Preview"
                  />
                )}
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white w-full rounded-lg hover:bg-blue-500 duration-200"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
