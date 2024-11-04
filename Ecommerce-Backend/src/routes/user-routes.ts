import { Router } from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user-controllers.js";
import { adminOnly } from "../middlewares/auth-middleware.js";
const app = Router();

// route - /api/v1/users/new
app.post("/new",newUser)

// route - /api/v1/users/all
app.get("/all",adminOnly,getAllUsers)

// route - /api/v1/users/DynamicID
app.route("/:id").get(getUser).delete(adminOnly,deleteUser)

export default app;