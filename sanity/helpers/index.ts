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
  categorySlug?: string
): Promise<Product[]> => {
  try {
    const result = await sanityFetch({
      query: ALL_PRODUCT_QUERY,
      params: { categorySlug: categorySlug || null },
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
    const newOrder = await backendClient.create({
      ...orderData,
    });

    return { success: true, newOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
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
