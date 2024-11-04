import { cache } from "../app.js";
import { invalidateCacheType } from "../types/types.js";

export const invalidateCache = ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: invalidateCacheType) => {
  if (product) {
    const productKey: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKey.push(`product${productId}`);
    if (typeof productId === "object")
      productKey.forEach((i) => {
        productKey.push(`product${i}`);
      });
    cache.del(productKey);
  }

  if (order) {
    const orderKey: string[] = [
      `my-order${userId}`,
      "all-orders",
      `order-${orderId}`,
    ];
    cache.del(orderKey);
  }
  if (admin) {
    cache.del([
      "admin-stats",
      "admin-pie-charts",
      "admin-bar-charts",
      "admin-line-charts",
    ]);
  }
};
