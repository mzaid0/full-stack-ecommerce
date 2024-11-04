import express from "express";
import { connectDb } from "./utils/db-connection.js";
import { errorHandler } from "./middlewares/error-middleware.js";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors"

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_SECRET_KEY || "";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

// Database configuration
connectDb(mongoURI as string);

export const stripe = new Stripe(stripeKey)

//Caching
export const cache = new NodeCache();

//Importing routes
import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";
import orderRoutes from "./routes/order-routes.js";
import paymentRoutes from "./routes/payment-routes.js";
import dashboardRoutes from "./routes/statistics-routes.js";


//Using routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//Error handling middleware
app.use(errorHandler);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
