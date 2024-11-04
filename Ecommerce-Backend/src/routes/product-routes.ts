import { Router } from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getProduct,
  latestProducts,
  newProduct,
  searchProducts,
  updateProduct,
} from "../controllers/product-controllers.js";
import { singleUpload } from "../middlewares/multer-middleware.js";
import { adminOnly } from "../middlewares/auth-middleware.js";

const app = Router();

// route - /api/v1/products/new
app.post("/new", adminOnly, singleUpload, newProduct);

// route - /api/v1/products/search
app.get("/search", searchProducts);

// route - /api/v1/products/latest
app.get("/latest", latestProducts);

// route - /api/v1/products/category
app.get("/category", getAllCategories);

// route - /api/v1/products/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

// route - /api/v1/users/DynamicID
app
  .route("/:id")
  .get(getProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
