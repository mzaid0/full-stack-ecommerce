import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
type ProductCardType = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const server = "http://localhost:4000";

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductCardType) => {
  return (
    // Product-Card
    <div className="w-48 h-56 flex flex-col items-center justify-between bg-white p-4 relative hover:bg-gray-300 mt-2 duration-200 cursor-pointer group rounded-md">
      {/* Image Wrapper */}
      <div className="h-32 w-full flex items-center justify-center overflow-hidden">
        <img
          className="h-full object-cover"
          src={`${server}/${photo}`}
          alt={name}
        />
      </div>

      {/* Text and Price */}
      <p className="mt-3 font-light text-sm text-center line-clamp-2">{name}</p>
      <span className="font-bold">${price}</span>

      {/* Plus Button */}
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full text-white bg-cyan-700 h-8 w-8 items-center justify-center hover:rotate-45 duration-300 hidden group-hover:flex">
        <button onClick={() => handler({
          productId,
          name,
          price,
          quantity:1,
          photo,
          stock
        })}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
