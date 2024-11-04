import { NextFunction, Request, Response } from "express";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order-models.js";
import { reduceStock } from "../utils/features.js";
import { invalidateCache } from "../utils/revalidate-cache.js";
import ErrorHandler from "../utils/custom-error-handler.js";
import { cache } from "../app.js";

export const myOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let orders;
    const { id: user } = req.query;
    const key = `my-order${user}`;
    if (cache.has(key)) {
      orders = JSON.parse(cache.get(key) as string);
    } else {
      orders = await Order.find({ user });
      cache.set(key, JSON.stringify(orders));
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const allOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let orders;
    const key = "all-orders";
    if (cache.has(key)) {
      orders = JSON.parse(cache.get(key) as string);
    } else {
      orders = await Order.find().populate("user", "name");
      cache.set(key, JSON.stringify(orders));
    }
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let order;
    const { id } = req.params;
    const key = `order-${id}`;

    if (cache.has(key)) {
      order = JSON.parse(cache.get(key) as string);
    } else {
      order = await Order.findById(id).populate("user", "name");
      if (!order) return next(new ErrorHandler("Order not found", 400));
      cache.set(key, JSON.stringify(order));
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const newOrder = async (
  req: Request<{}, {}, NewOrderRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
      return next(new ErrorHandler("Please fill all fields", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);
    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: order.orderItems.map((i) => String(i.productId)),
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const processOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler("Order not found", 404));

    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Delivered";
        break;
    }
    await order.save();
    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user,
      orderId: String(order._id),
    });

    res.status(200).json({
      success: true,
      message: "Order processed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler("Order not found", 404));

    invalidateCache({
      product: false,
      order: true,
      admin: true,
      userId: order.user,
      orderId: String(order._id),
    });
    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
