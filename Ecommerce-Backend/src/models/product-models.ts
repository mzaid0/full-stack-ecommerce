import { Schema, model } from "mongoose";
import { trim } from "validator";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    photo: {
      type: String,
      required: [true, "Please add product photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    category: {
      type: String,
      required: [true, "Please select product category"],
      trim:true
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
