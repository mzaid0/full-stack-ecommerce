import { Router } from "express";
import {
  allOrder,
  deleteOrder,
  getOrder,
  myOrder,
  newOrder,
  processOrder,
} from "../controllers/order-controllers.js";
import { adminOnly } from "../middlewares/auth-middleware.js";

const app = Router();

// route - /api/v1/orders/new
app.post("/new", newOrder);

// route - /api/v1/orders/my
app.get("/my", myOrder);

// route - /api/v1/orders/all
app.get("/all", adminOnly, allOrder);

// route - /api/v1/orders/DynamicID
app
  .route("/:id")
  .get(getOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default app;
