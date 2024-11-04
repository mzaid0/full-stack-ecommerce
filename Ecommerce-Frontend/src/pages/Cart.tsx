import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";

const server = "http://localhost:4000";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (store: { cartReducer: CartReducerInitialState }) => store.cartReducer
    );

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity > cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
    toast.success("Item removed from Cart");
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const { token, cancel } = axios.CancelToken.source();

      axios
        .get(`${server}/api/v1/payment/discount?couponCode=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          cancel();
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    // Cart
    <div className="px-6 py-4 flex justify-between items-center gap-10">
      <main className="w-[70%] overflow-auto space-y-8">
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <CartItems
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItems={item}
            />
          ))
        ) : (
          <h1 className="text-3xl font-light text-center opacity-50">
            No items added
          </h1>
        )}
      </main>
      <aside className="w-[30%] p-4 flex flex-col gap-3 items-stretch justify-center">
        <p>Subtotal: ${subtotal}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>
          Discount: <em className="text-red-500"> - ${discount}</em>
        </p>
        <p>
          Total: <b>${total}</b>
        </p>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-400 outline-none text-sm"
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="text-green-500 flex gap-1 -mt-2">
              ${discount} discount using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-500 -mt-2">
              Invalid coupon <MdOutlineSpeakerNotesOff />
            </span>
          ))}

        {cartItems.length > 0 && (
          <Link
            className="px-4 py-2 bg-blue-600 text-center text-white w-full rounded-lg hover:bg-blue-500 duration-200"
            to={"/shipping"}
          >
            Check Out
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
