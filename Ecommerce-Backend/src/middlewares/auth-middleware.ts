import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/custom-error-handler.js";
import { User } from "../models/user-models.js";

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler("Login required", 401));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User not found", 401));

    if (user.role !== "admin")
      return next(new ErrorHandler("Only admin can access it.", 401));

    next();
  } catch (error) {
    next(error);
  }
};
