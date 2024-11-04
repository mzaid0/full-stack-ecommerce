import { NextFunction, Request, Response } from "express";
import { cache } from "../app.js";
import { Product } from "../models/product-models.js";
import { User } from "../models/user-models.js";
import { Order } from "../models/order-models.js";
import {
  calculatePercentage,
  getChartData,
  getInventories,
} from "../utils/features.js";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let stats;
    const key = "admin-stats";

    if (cache.has(key)) stats = JSON.parse(cache.get(key) as string);
    else {
      const today = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

      const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
      };

      const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      };

      const thisMonthProductsPromise = Product.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthProductsPromise = Product.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const thisMonthUsersPromise = User.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthUsersPromise = User.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const thisMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      const lastSixMonthOrdersPromise = Order.find({
        createdAt: {
          $gte: sixMonthAgo,
          $lte: today,
        },
      });

      const latestTransactionPromise = Order.find({})
        .select(["orderItems", "discount", "total", "status"])
        .limit(5);

      const [
        thisMonthProducts,
        lastMonthProducts,
        thisMonthUsers,
        lastMonthUsers,
        thisMonthOrders,
        lastMonthOrders,
        productCount,
        usersCount,
        allOrders,
        lastSixMonthOrders,
        categories,
        femaleUser,
        latestTransactions,
      ] = await Promise.all([
        thisMonthProductsPromise,
        lastMonthProductsPromise,
        thisMonthUsersPromise,
        lastMonthUsersPromise,
        thisMonthOrdersPromise,
        lastMonthOrdersPromise,
        Product.countDocuments(),
        User.countDocuments(),
        Order.find({}).select("total"),
        lastSixMonthOrdersPromise,
        Product.distinct("category"),
        User.countDocuments({ gender: "female" }),
        latestTransactionPromise,
      ]);

      const thisMonthRevenue = thisMonthOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );

      const lastMonthRevenue = lastMonthOrders.reduce(
        (total, order) => total + (order.total || 0),
        0
      );

      const percentage = {
        revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
        products: calculatePercentage(
          thisMonthProducts.length,
          lastMonthProducts.length
        ),
        users: calculatePercentage(
          thisMonthUsers.length,
          lastMonthUsers.length
        ),
        orders: calculatePercentage(
          thisMonthOrders.length,
          lastMonthOrders.length
        ),
      };

      const revenue = allOrders.reduce(
        (acc, order) => acc + (order.total || 0),
        0
      );

      const counts = {
        revenue,
        products: productCount,
        users: usersCount,
        order: allOrders.length,
      };

      const orderMonthCount = new Array(6).fill(0);
      const orderMonthlyRevenue = new Array(6).fill(0);

      lastSixMonthOrders.forEach((order) => {
        const creationDate = order.createdAt;
        const monthDifference =
          (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDifference < 6) {
          orderMonthCount[6 - monthDifference - 1] += 1;
          orderMonthlyRevenue[6 - monthDifference - 1] += order.total;
        }
      });
      const categoryCount = await getInventories({ categories, productCount });

      const userGenderRation = {
        male: usersCount - femaleUser,
        female: femaleUser,
      };

      const modifiedLatestTransactions = latestTransactions.map((i) => ({
        _id: i._id,
        discount: i.discount,
        amount: i.total,
        quantity: i.orderItems.length,
        status: i.status,
      }));

      stats = {
        categoryCount,
        percentage,
        counts,
        chart: {
          orders: orderMonthCount,
          revenue: orderMonthlyRevenue,
        },
        userGenderRation,
        latestTransactions: modifiedLatestTransactions,
      };

      cache.set(key, JSON.stringify(stats));
    }

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getPieCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    const key = "admin-pie-charts";

    if (cache.has(key)) charts = JSON.parse(cache.get(key) as string);
    else {
      const allOrderPromise = Order.find({}).select([
        "total",
        "discount",
        "subtotal",
        "tax",
        "shippingCharges",
      ]);
      const [
        processingCount,
        shippedCount,
        deliveredCount,
        categories,
        productCount,
        outOfStock,
        allOrder,
        allUsers,
        adminUsers,
        customerUsers,
      ] = await Promise.all([
        Order.countDocuments({ status: "Processing" }),
        Order.countDocuments({ status: "Shipped" }),
        Order.countDocuments({ status: "Delivered" }),
        Product.distinct("category"),
        Product.countDocuments(),
        Product.countDocuments({ stock: 0 }),
        allOrderPromise,
        User.find({}).select("dob"),
        User.countDocuments({ role: "admin" }),
        User.countDocuments({ role: "user" }),
      ]);

      const orderFulfillment = {
        processing: processingCount,
        shipped: shippedCount,
        delivered: deliveredCount,
      };

      const productCategories = await getInventories({
        categories,
        productCount,
      });

      const stockAvailability = {
        inStock: productCount - outOfStock,
        outOfStock,
      };

      const grossIncome = allOrder.reduce(
        (prev, order) => prev + (order.total || 0),
        0
      );

      const discount = allOrder.reduce(
        (prev, order) => prev + (order.discount || 0),
        0
      );

      const productionCost = allOrder.reduce(
        (prev, order) => prev + (order.shippingCharges || 0),
        0
      );

      const burnt = allOrder.reduce(
        (prev, order) => prev + (order.tax || 0),
        0
      );

      const marketingCost = Math.round(grossIncome * (30 / 100));

      const netMargin =
        grossIncome - (discount + productionCost + burnt + marketingCost);

      const revenueDistribution = {
        netMargin,
        discount,
        productionCost,
        burnt,
        marketingCost,
      };

      const usersAgeGroup = {
        teen: allUsers.filter((user) => user.age < 20).length,
        adult: allUsers.filter((user) => user.age >= 20 && user.age < 40)
          .length,
        old: allUsers.filter((user) => user.age >= 40).length,
      };

      const adminCustomer = {
        admin: adminUsers,
        customer: customerUsers,
      };
      charts = {
        orderFulfillment,
        productCategories,
        stockAvailability,
        revenueDistribution,
        usersAgeGroup,
        adminCustomer,
      };

      cache.set(key, JSON.stringify(charts));
    }
    return res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    next(error);
  }
};

export const getBarCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    const key = "admin-bar-charts";
    if (cache.has(key)) charts = JSON.parse(cache.get(key)!);
    else {
      const today = new Date();

      const sixMonths = new Date();
      sixMonths.setMonth(sixMonths.getMonth() - 6);

      const twelveMonths = new Date();
      twelveMonths.setMonth(twelveMonths.getMonth() - 12);

      const sixMonthsProductPromise = Product.find({
        createdAt: {
          $gte: sixMonths,
          $lte: today,
        },
      }).select("createdAt");

      const sixMonthsUserPromise = User.find({
        createdAt: {
          $gte: sixMonths,
          $lte: today,
        },
      }).select("createdAt");

      const twelveMonthsOrderPromise = Order.find({
        createdAt: {
          $gte: twelveMonths,
          $lte: today,
        },
      }).select("createdAt");

      const [products, users, orders] = await Promise.all([
        sixMonthsProductPromise,
        sixMonthsUserPromise,
        twelveMonthsOrderPromise,
      ]);

      const productsCount = getChartData({
        length: 6,
        today,
        docArr: products,
      });
      const usersCount = getChartData({ length: 6, today, docArr: users });
      const ordersCount = getChartData({ length: 12, today, docArr: orders });

      charts = {
        products: productsCount,
        users: usersCount,
        orders: ordersCount,
      };
      cache.set(key, JSON.stringify(charts));
    }
    res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    next(error);
  }
};

export const getLineCharts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let charts;
    const key = "admin-line-charts";
    if (cache.has(key)) charts = JSON.parse(cache.get(key)!);
    else {
      const today = new Date();

      const twelveMonths = new Date();
      twelveMonths.setMonth(twelveMonths.getMonth() - 12);

      const baseQuery = {
        createdAt: {
          $gte: twelveMonths,
          $lte: today,
        },
      };

      const [products, users, orders] = await Promise.all([
        Product.find(baseQuery).select("createdAt"),
        User.find(baseQuery).select("createdAt"),
        Order.find(baseQuery).select(["createdAt","discount","total"]),
      ]);

      const productsCount = getChartData({
        length: 12,
        today,
        docArr: products,
      });
      const usersCount = getChartData({ length: 12, today, docArr: users });
      const discount = getChartData({ length: 12, today, docArr: orders,property:"discount" });
      const revenue = getChartData({ length: 12, today, docArr: orders,property:"total" });

      charts = {
        products: productsCount,
        users: usersCount,
        discount,
        revenue
      };
      cache.set(key, JSON.stringify(charts));
    }
    res.status(200).json({
      success: true,
      charts,
    });
  } catch (error) {
    next(error);
  }
};
