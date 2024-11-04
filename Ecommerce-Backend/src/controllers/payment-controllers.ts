import { NextFunction, Request, Response } from "express";
import { Coupon } from "../models/coupon-models.js";
import ErrorHandler from "../utils/custom-error-handler.js";

export const newCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { couponCode, amount } = req.body;
    await Coupon.create({
      couponCode,
      amount,
    });

    if (!couponCode || !amount)
      return next(new ErrorHandler("Please enter coupon code and amount", 400));

    res.status(201).json({
      success: true,
      message: `Coupon ${couponCode} created successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const applyDiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { couponCode } = req.query;
    const coupon = await Coupon.findOne({ couponCode });
    if (!coupon) return next(new ErrorHandler("Coupon not found", 404));
    res.status(200).json({
      success: true,
      message: `Coupon ${couponCode} applied successfully`,
      discount: coupon.amount,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCoupons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) return next(new ErrorHandler("Coupon not found", 400));
    await coupon.deleteOne();
    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.couponCode} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
