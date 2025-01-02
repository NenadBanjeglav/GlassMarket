/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { Product } from "@/sanity.types";
import { backendClient } from "../lib/backendClient";
import { sanityFetch } from "../lib/live";
import {
  ALL_ORDERS_QUERY,
  ALL_PRODUCT_QUERY,
  ALL_PRODUCTS_COUNT_QUERY,
  ALL_USERS_COUNT_QUERY,
  CATEGORIES_QUERY,
  HERO_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG,
  PRODUCTS_NEW,
  PRODUCTS_ON_SALE,
  RETURN_FORM_QUERY,
} from "./queries";
import { revalidatePath } from "next/cache";

export const getHero = async () => {
  try {
    const heroes = await sanityFetch({
      query: HERO_QUERY,
    });
    return heroes.data || [];
  } catch (error) {
    console.error(`Error fetching Hero data:`, error);
    return [];
  }
};

export const getAllProducts = async (
  categorySlug?: string,
  volumeSlug?: number
): Promise<Product[]> => {
  try {
    const result = await sanityFetch({
      query: ALL_PRODUCT_QUERY,
      params: {
        categorySlug: categorySlug || null,
        volumeSlug: volumeSlug || null,
      },
    });

    // Ensure the function returns an array of products
    return result.data || [];
  } catch (error) {
    console.error(`Error fetching Products data:`, error);
    return [];
  }
};

export const getProductsOnSale = async () => {
  try {
    const products = await sanityFetch({
      query: PRODUCTS_ON_SALE,
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    return [];
  }
};

export const getProductsNew = async () => {
  try {
    const products = await sanityFetch({
      query: PRODUCTS_NEW,
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching new products:", error);
    return [];
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: {
        slug,
      },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error fetching Product data:", error);
    return null;
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching Categories data:", error);
    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });

    return products?.data || [];
  } catch (error) {
    console.error("Fetching product by category error", error);
    return [];
  }
};

export async function createOrder(orderData: any) {
  try {
    const newOrder = await backendClient.create({
      ...orderData,
    });

    return { success: true, newOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateProductStock(
  products: { product: { _ref: string }; quantity: number }[]
) {
  try {
    const updatePromises = products.map(async (item) => {
      const productId = item.product._ref;

      // Fetch the current product stock
      const query = `*[_type == "product" && _id == $productId][0] { stock }`;
      const params = { productId };

      const product = await backendClient.fetch(query, params);

      if (product && product.stock !== undefined) {
        const newStock = product.stock - item.quantity;

        if (newStock < 0) {
          throw new Error(`Not enough stock for product ID: ${productId}`);
        }

        // Update the product stock in Sanity
        return backendClient.patch(productId).set({ stock: newStock }).commit();
      }
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw new Error("Failed to update product stock");
  }
}

export const getUserOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required!");
  }

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.error(`Fetching user order Error:`, error);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
    });
    return orders.data || [];
  } catch (error) {
    console.error(`Fetching user order Error:`, error);
    return [];
  }
};

export const getReturnForm = async () => {
  try {
    const returnForm = await sanityFetch({
      query: RETURN_FORM_QUERY,
    });
    return returnForm.data || [];
  } catch (error) {
    console.error(`Fetching return form Error:`, error);
  }
};

export async function createOrUpdateUser(
  userData: any,
  orderRef: string,
  orderNumber: string
) {
  try {
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const existingUser = await backendClient.fetch(userQuery, {
      email: userData.email,
    });

    if (existingUser) {
      await backendClient
        .patch(existingUser._id)
        .setIfMissing({ orders: [] })
        .append("orders", [
          {
            _type: "reference",
            _ref: orderRef,
            _key: orderNumber,
          },
        ])
        .commit();

      return { success: true, user: existingUser, action: "updated" };
    } else {
      const newUser = {
        _type: "user",
        ...userData,
        orders: [
          {
            _type: "reference",
            _ref: orderRef,
            _key: orderNumber,
          },
        ],
        createdAt: new Date().toISOString(),
      };

      const createdUser = await backendClient.create(newUser);
      return { success: true, user: createdUser, action: "created" };
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return { success: false, error: "Failed to create or update user" };
  }
}

export const getProductCount = async () => {
  try {
    const count = await sanityFetch({
      query: ALL_PRODUCTS_COUNT_QUERY,
    });
    return count || 0; // Return 0 if no count is found
  } catch (error) {
    console.error(`Fetching product count error:`, error);
    return 0; // Return 0 in case of an error
  }
};

export const getUserCount = async () => {
  try {
    const count = await sanityFetch({
      query: ALL_USERS_COUNT_QUERY,
    });
    return count || 0; // Return 0 if no count is found
  } catch (error) {
    console.error(`Fetching user count error:`, error);
    return 0; // Return 0 in case of an error
  }
};

type SalesDataType = Array<{
  month: string;
  totalSales: number;
  totalDelivery: number;
}>;

export const getSalesSummary = async () => {
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  try {
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
    });

    const filteredOrders = orders.data.filter((order: any) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= sixMonthsAgo && orderDate <= today;
    });

    const salesData: SalesDataType = filteredOrders
      .map((entry: any) => {
        const month = new Date(entry.createdAt).toLocaleDateString("en-GB", {
          month: "2-digit",
          year: "2-digit",
        });

        return {
          month,
          totalSales: entry.totalPrice,
          totalDelivery: entry.deliveryPrice,
        };
      })
      .reduce((acc: SalesDataType, entry: any) => {
        // Check if the month already exists in the accumulator
        const existingMonth = acc.find((item) => item.month === entry.month);

        if (existingMonth) {
          // If the month exists, add the totalSales to it
          existingMonth.totalSales += entry.totalSales;
          existingMonth.totalDelivery += entry.totalDelivery;
        } else {
          // If the month doesn't exist, add it to the accumulator
          acc.push(entry);
        }

        return acc;
      }, []);

    // Sum up the priceOfProducts values

    const totalSales = orders.data.reduce(
      (sum: number, order: any) => sum + (order.totalPrice || 0),
      0
    );

    const totalDelivery = orders.data.reduce(
      (sum: number, order: any) => sum + (order.deliveryPrice || 0),
      0
    );

    const totalPriceOfProducts = orders.data.reduce(
      (sum: number, order: any) => sum + (order.priceOfProducts || 0),
      0
    );

    const totalOrders = orders.data.length;

    const recentOrders = orders.data.filter((order: any) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= threeDaysAgo && orderDate <= today;
    });

    return {
      totalSales,
      totalDelivery,
      salesData,
      totalOrders,
      recentOrders,
      totalPriceOfProducts,
    };
  } catch (error) {
    console.error(`Fetching total sales error:`, error);
    return 0; // Return 0 in case of an error
  }
};

export const getOrderSummary = async () => {
  const productCount = await getProductCount();
  const userCount = await getUserCount();
  const salesSummary = await getSalesSummary();

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    productCount: productCount.data,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userCount: userCount.data,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ordersCount: salesSummary.totalOrders,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    totalSales: salesSummary.totalSales,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    totalDelivery: salesSummary.totalDelivery,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    totalPriceOfProducts: salesSummary.totalPriceOfProducts,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    salesData: salesSummary.salesData,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    recentOrders: salesSummary.recentOrders,
  };
};

export const updateOrderStatus = async (
  orderNumber: string,
  newStatus: string
) => {
  try {
    // Find the order by orderNumber and update its status
    await backendClient
      .patch({
        query: '*[_type == "order" && orderNumber == $orderNumber]',
        params: { orderNumber },
      })
      .set({ status: newStatus })
      .commit();

    revalidatePath("/admin");
  } catch (error) {
    console.error("Failed to update order status:", error);
  }
};
