import { Schema, model } from "mongoose";

const couponSchema = new Schema({
  couponCode: {
    type: String,
    required: [true, "Please enter the coupon code"],
    unique: true,
  },
  amount: {
    type: String,
    required: [true, "Please enter the Discount amount code"],
  },
});

export const Coupon = model("Coupon", couponSchema);
