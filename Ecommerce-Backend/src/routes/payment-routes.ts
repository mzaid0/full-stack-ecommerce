import { Router } from "express";
import {
  applyDiscount,
  deleteCoupon,
  getAllCoupons,
  newCoupon,
} from "../controllers/payment-controllers.js";
import { adminOnly } from "../middlewares/auth-middleware.js";

const app = Router();

// route - /api/v1/payment/discount
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
app.post("/coupon/new", adminOnly, newCoupon);

// route - /api/v1/payment/coupon/all
app.get("/coupon/all", adminOnly, getAllCoupons);

// route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id", adminOnly, deleteCoupon);

export default app;
