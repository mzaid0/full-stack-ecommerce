import { useState } from "react";


import img from "../../../assets/images/laptop.png"
import { Link } from "react-router-dom";
import AdminSidebar from "../../../components/adminComponents/AdminSidebar";
import { OrderItemType, OrderType } from "../../../types";


const orderItems: OrderItemType[] = [
  {
    name: "Laptop",
    photo: img,
    price: 2000,
    quantity: 2,
    _id: "992883hwi",
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Dr Strange",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "United States",
    pinCode: 1234,
    status: "Processing",
    subTotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "310717003",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subTotal,
    shippingCharges,
    tax,
    discount,
    status,
    total,
  } = order;

  const updateHandler = () => {
    setOrder((order) => ({
      ...order,
      status: order.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };
  return (
    <div className="grid grid-cols-6 gap-2 ">
      <AdminSidebar />
      <main className=" col-span-5 h-full flex gap-10 items-center justify-center ">
        <section className="overflow-auto relative p-10 h-[90%] bg-white py-4 w-full max-w-sm rounded-md shadow-md">
          <h2 className="tracking-wider text-xl uppercase font-light text-center">
            Order Items
          </h2>
          {order.orderItems.map((item) => (
            <ProductCard
              key={item._id}
              name={item.name}
              _id={item._id}
              photo={item.photo}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </section>

        <article className="h-[90%] bg-white p-4  w-full max-w-sm rounded-md shadow-md text-sm">
          <h2 className="tracking-wider text-xl uppercase font-light text-center">
            Order info
          </h2>
          <div className="p-10 space-y-5  w-full">
            <div>
            <h5 className="font-bold">User info</h5>
            <p>Name : {name}</p>
            <p>
              Address: {`${address}, ${city}, ${state}, ${country}, ${pinCode}`}
            </p>
            </div>

            <div>
            <h5 className="font-bold">Amount Info</h5>
            <p>Subtotal : {subTotal}</p>
            <p>Shipping charges : {shippingCharges}</p>
            <p>Tax : {tax}</p>
            <p>Discount : {discount}</p>
            <p>Total : {total}</p>
            </div>

            <div>
            <h5 className="font-bold">Status info</h5>
            <p>
              Status:{" "}
              <span
                className={
                  status === "Processing"
                    ? "text-purple-600"
                    : status === "Shipped"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {status}
              </span>
            </p>

            <button className="bg-blue-500 w-full py-2 mt-2 text-white rounded-md hover:bg-blue-600 duration-200" onClick={updateHandler}>Process Order</button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, _id, photo, price, quantity }: OrderItemType) => (
  <div className="flex items-center justify-center gap-6">
    <img
      className="h-12 w-12 object-cover rounded-md "
      src={photo}
      alt={name}
    />
    <Link className="text-sm text-gray-600" to={`/product/${_id}`}>
      {name}
    </Link>
    <span className="ml-auto">
      ${price} x {quantity}= $ {quantity * price}
    </span>
  </div>
);

export default TransactionManagement;
