import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";

const Search = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: searchedData,
    isError: productError,
    error: errorProduct,
  } = useSearchProductsQuery({
    search,
    sort,
    price: maxPrice,
    category,
    page,
  });

  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError,
    error,
  } = useCategoriesQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Item added to cart");
  };

  if (isError) toast.error((error as CustomError).data.message);

  if (productError) toast.error((errorProduct as CustomError).data.message);

  return (
    // Product-search-page
    <div className="p-6 flex items-stretch justify-start gap-8">
      <aside className="min-w-min shadow-md h-[100vh] bg-white p-6 flex flex-col gap-4">
        <h2 className="tracking-wider text-xl uppercase font-light text-center">
          Filters
        </h2>
        <div>
          <h4 className="text-xs font-semibold mb-1">Sort</h4>
          <select
            className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-400 outline-none text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4 className="text-xs font-semibold">Max Price: {maxPrice || ""}</h4>
          <input
            className="w-full "
            type="range"
            min={1000}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4 className="text-xs font-semibold mb-1">Category</h4>
          <select
            className="w-full px-4 py-2 rounded-md border bg-transparent border-gray-400 outline-none text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {categoriesLoading === false &&
              categoriesResponse?.categories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main className="flex-1 bg-white px-8 py-6 w-full ">
        <h2 className="tracking-wider text-2xl uppercase font-light">
          Products
        </h2>
        <input
          className="w-full p-2 outline-none bg-transparent"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Search-Product-List */}
        <div className="flex items-start justify-start gap-10 flex-wrap overflow-y-auto ">
          {searchedData?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              photo={product.photo}
              handler={addToCartHandler}
            />
          ))}
        </div>

        {searchedData && searchedData?.totalPages > 1 && (
          <article className="flex items-center justify-center gap-2 mt-4">
            <button
              className="bg-gray-300 px-2 py-1 rounded-md disabled:opacity-50 text-sm"
              disabled={page === 1} // Disable if on the first page
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Move to the previous page
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPages}
            </span>
            <button
              className="bg-gray-300 px-2 py-1 rounded-md disabled:opacity-50 text-sm"
              disabled={page === searchedData.totalPages} // Disable if on the last page
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, searchedData.totalPages))
              } // Move to the next page
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
