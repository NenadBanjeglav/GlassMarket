"use server";

import { Product } from "@/sanity.types";
import { backendClient } from "../lib/backendClient";
import { sanityFetch } from "../lib/live";
import {
  ALL_PRODUCT_QUERY,
  CATEGORIES_QUERY,
  HERO_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_SLUG,
} from "./queries";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createOrder(orderData: any) {
  try {
    // Update product stock first
    await updateProductStock(orderData.products);

    // Create the new order only after the stock update is successful
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
