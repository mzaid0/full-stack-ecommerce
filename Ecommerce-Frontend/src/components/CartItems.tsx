import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
type CartItemsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: CartItem;
  incrementHandler: (CartItem: CartItem) => void;
  decrementHandler: (CartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};
const server = "http://localhost:4000";
const CartItems = ({
  cartItems,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemsProps) => {
  const { productId, photo, name, price, quantity } = cartItems;
  return (
    // Cart-item
    <div className="flex items-center justify-around gap-10 px-20">
      <div className="h-16 w-20 flex items-center justify-center overflow-hidden">
        <img
          className=" h-full object-cover"
          src={`${server}/${photo}`}
          alt={name}
        />
      </div>
      <article className="flex flex-1 flex-col items-start justify-center gap-1">
        <Link
          className="text-lg hover:text-cyan-700 duration-200"
          to={`/product/${productId}`}
        >
          {name}
        </Link>
        <span className="font-bold text-sm">${price}</span>
      </article>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => decrementHandler(cartItems)}
          className="bg-gray-300 h-8 w-8 rounded-md hover:bg-gray-400 duration-200"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => incrementHandler(cartItems)}
          className="bg-gray-300 h-8 w-8 rounded-md hover:bg-gray-400 duration-200"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeHandler(productId)}
        className="hover:text-red-500 duration-200"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItems;
