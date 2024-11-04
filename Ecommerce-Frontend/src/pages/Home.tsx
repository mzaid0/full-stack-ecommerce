import { Link } from "react-router-dom";
import coverImg from "../assets/images/coverImage.webp";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Item added to cart");
  };

  if (isError) toast.error("Error in fetching products");
  return (
    // Home
    <div className="px-16">
      <section>
        <img
          className="h-52 w-[90%] mx-auto object-cover rounded-xl"
          src={coverImg}
          alt="cover image"
        />
      </section>
      <h1 className="mt-4 flex items-center justify-between  text-2xl font-light uppercase">
        Latest Products
        <Link
          className="text-base hover:text-cyan-700 duration-200"
          to={"/search"}
        >
          More
        </Link>
      </h1>
      <main className="flex items-start flex-wrap gap-10 overflow-auto">
        {isLoading ? (
          <Loader />
        ) : (
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photo={product.photo}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
