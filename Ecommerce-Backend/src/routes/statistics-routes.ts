import { Router } from "express";
import {
  getBarCharts,
  getDashboardStats,
  getLineCharts,
  getPieCharts,
} from "../controllers/statistics-controllers.js";
import { adminOnly } from "../middlewares/auth-middleware.js";

const app = Router();

// route - /api/v1/dashboard/stats
app.get("/stats", adminOnly, getDashboardStats);

// route - /api/v1/dashboard/pie
app.get("/pie", adminOnly, getPieCharts);

// route - /api/v1/dashboard/bar
app.get("/bar", adminOnly, getBarCharts);

// route - /api/v1/dashboard/line
app.get("/line", adminOnly, getLineCharts);

export default app;
