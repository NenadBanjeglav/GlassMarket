"use server";

import { Product } from "@/sanity.types";
import { backendClient } from "../lib/backendClient";
import { sanityFetch } from "../lib/live";
import {
  ALL_ORDERS_QUERY,
  ALL_PRODUCT_QUERY,
  ALL_PRODUCTS_COUNT_QUERY,
  ALL_USERS_COUNT_QUERY,
  ALL_USERS_QUERY,
  GET_ALL_CATEGORIES_QUERY,
  HERO_QUERY,
  MAIN_CATEGORIES_QUERY,
  MY_ORDERS_QUERY,
  NON_MAIN_CATEGORIES_QUERY,
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

export const getMainCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: MAIN_CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching Main Categories data:", error);
    return [];
  }
};

export const getNonMainCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: NON_MAIN_CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching Non Main Categories data:", error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: GET_ALL_CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching All Categories data:", error);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        userStatus: "active",
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

export const getAllUsers = async () => {
  try {
    const users = await sanityFetch({
      query: ALL_USERS_QUERY,
    });
    return users.data || [];
  } catch (error) {
    console.error(`Fetching users Error:`, error);
    return [];
  }
};

// Interface for a single order
export interface OrderType {
  createdAt?: string;
  totalPrice?: number;
  deliveryPrice?: number;
  priceOfProducts?: number;
}

// Type for an array of sales data entries
export type SalesDataType = Array<{
  month: string;
  totalSales: number;
  totalDelivery: number;
}>;

// Interface for the sales summary
export interface SalesSummaryType {
  totalSales: number;
  totalDelivery: number;
  totalPriceOfProducts: number;
  totalOrders: number;
  recentOrders: OrderType[];
  salesData: SalesDataType;
}

// Interface for the result of the order summary
export interface OrderSummaryType extends SalesSummaryType {
  productCount: number;
  userCount: number;
}

export const getSalesSummary = async (): Promise<SalesSummaryType> => {
  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 3);
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  try {
    const orders = await sanityFetch({
      query: ALL_ORDERS_QUERY,
    });

    // Reduce orders for summary and sales data
    const summary = orders.data.reduce(
      (acc, order) => {
        if (!order.createdAt) {
          return acc;
        }
        const orderDate = new Date(order.createdAt);
        const month = orderDate.toLocaleDateString("en-GB", {
          month: "2-digit",
          year: "2-digit",
        });

        // Update recent orders
        if (orderDate >= threeDaysAgo && orderDate <= today) {
          acc.recentOrders.push(order);
        }

        // Update totals
        acc.totalSales += order.totalPrice || 0;
        acc.totalDelivery += order.deliveryPrice || 0;
        acc.totalPriceOfProducts += order.priceOfProducts || 0;

        // Update monthly sales data
        const existingMonth = acc.salesData.find(
          (item) => item.month === month
        );
        if (existingMonth) {
          existingMonth.totalSales += order.totalPrice || 0;
          existingMonth.totalDelivery += order.deliveryPrice || 0;
        } else {
          acc.salesData.push({
            month,
            totalSales: order.totalPrice || 0,
            totalDelivery: order.deliveryPrice || 0,
          });
        }

        return acc;
      },
      {
        totalSales: 0,
        totalDelivery: 0,
        totalPriceOfProducts: 0,
        totalOrders: orders.data.length,
        recentOrders: [] as OrderType[],
        salesData: [] as SalesDataType,
      }
    );

    return summary;
  } catch (error) {
    console.error(`Fetching total sales error:`, error);
    throw new Error("Failed to fetch sales summary.");
  }
};

export const getOrderSummary = async () => {
  try {
    const productCount = await getProductCount();
    const userCount = await getUserCount();
    const salesSummary = await getSalesSummary();

    const productCountData = productCount === 0 ? 0 : productCount.data;
    const userCountData = userCount === 0 ? 0 : userCount.data;

    return {
      productCount: productCountData,
      userCount: userCountData,
      ...salesSummary,
    };
  } catch (error) {
    console.error(`Fetching order summary error:`, error);
    throw new Error("Failed to fetch order summary.");
  }
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

export const updateUserStatus = async (email: string, newStatus: string) => {
  try {
    // Find the user by email and update their status
    await backendClient
      .patch({
        query: '*[_type == "user" && email == $email]',
        params: { email },
      })
      .set({ userStatus: newStatus })
      .commit();

    // Optionally revalidate any paths that depend on user data
    revalidatePath("/admin"); // Adjust the path based on your application structure
  } catch (error) {
    console.error("Failed to update user status:", error);
  }
};

export const checkUserStatus = async (email: string): Promise<boolean> => {
  try {
    const query = '*[_type == "user" && email == $email][0]';
    const user = await backendClient.fetch(query, { email });

    // Check if user exists and if the status is "banned"
    if (user && user.userStatus === "banned") {
      return true; // User is banned
    }

    return false; // User is not banned
  } catch (error) {
    console.error("Failed to check user status:", error);
    return false;
  }
};
