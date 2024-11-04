import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/custom-error-handler.js";

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = err.message || "Internal server error";
  const status = err.statusCode || 500;
  return res.status(status).json({
    success: false,
    message: message,
  });
};
