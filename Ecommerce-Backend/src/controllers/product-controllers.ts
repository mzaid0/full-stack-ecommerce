import { NextFunction, Request, Response } from "express";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product-models.js";
import ErrorHandler from "../utils/custom-error-handler.js";
import { rm } from "fs";
import { cache } from "../app.js";
import { invalidateCache } from "../utils/revalidate-cache.js";

//Revalidate on new , update , delete and new order
export const latestProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let products;
    if (cache.has("latest-products")) {
      products = JSON.parse(cache.get("latest-products") as string);
    } else {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
      cache.set("latest-products", JSON.stringify(products));
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

//Revalidate on new , update , delete and new order
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let categories;
    if (cache.has("categories")) {
      categories = JSON.parse(cache.get("categories") as string);
    } else {
      categories = await Product.distinct("category");
      cache.set("categories", JSON.stringify(categories));
    }

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

//Revalidate on new , update , delete and new order
export const getAdminProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let products;
    if (cache.has("all-products")) {
      products = JSON.parse(cache.get("all-products") as string);
    } else {
      products = await Product.find({});
      cache.set("all-products", JSON.stringify(products));
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

//Revalidate on new , update , delete and new order
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let product;
    if (cache.has(`product${id}`)) {
      product = JSON.parse(cache.get(`product${id}`) as string);
    } else {
      product = await Product.findById(id);
      cache.set(`product${id}`, JSON.stringify(product));
    }
    if (!product) return next(new ErrorHandler("Product not found", 404));
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const newProduct = async (
  req: Request<{}, {}, NewProductRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add photo", 400));
    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Photo Deleted");
        return next(new ErrorHandler("Please fill all fields", 400));
      });
    }
    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    invalidateCache({ product: true, admin: true });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    if (photo) {
      rm(product.photo, () => {
        console.log("Old photo deleted");
      });
      product.photo = photo.path;
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();
    invalidateCache({
      product: true,
      admin: true,
      productId: String(product._id),
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Product not found", 404));
    rm(product.photo, () => {
      console.log("Photo deleted");
    });
    await product.deleteOne();
    invalidateCache({
      product: true,
      admin: true,
      productId: String(product._id),
    });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request<{}, {}, {}, SearchRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort, price, category } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE || 8);
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    if (category) baseQuery.category = category;

    const [products, filteredOnlyProducts] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort && { price: "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      Product.find(baseQuery),
    ]);

    const totalPages = Math.ceil(filteredOnlyProducts.length / limit);

    res.status(200).json({
      success: true,
      products,
      page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
