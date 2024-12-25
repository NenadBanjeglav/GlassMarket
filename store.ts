import { Product } from "./sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => {
    subtotal: number;
  };
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  setItemCount: (productId: string, quantity: number) => void;
  getTotalWeight: () => number; // New method for total weight
  getDeliveryPrice: () => number;
}

const userCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(({ product }) => product._id !== productId),
        })),

      resetCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      getSubtotalPrice: () => {
        const subtotal = get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount;
          return total + discountedPrice * item.quantity;
        }, 0);

        return {
          subtotal,
        };
      },

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      setItemCount: (productId, quantity) =>
        set((state) => ({
          items:
            quantity > 0
              ? state.items.map((item) =>
                  item.product._id === productId ? { ...item, quantity } : item
                )
              : state.items.filter((item) => item.product._id !== productId),
        })),
      getTotalWeight: () => {
        return get().items.reduce(
          (totalWeight, item) =>
            totalWeight + (item.product.weight ?? 0) * item.quantity,
          0
        );
      },
      getDeliveryPrice: () => {
        const weightKg = get().getTotalWeight() / 1000;

        if (weightKg >= 230 && weightKg <= 480) {
          return 8300;
        }

        if (weightKg <= 5) return 700;
        if (weightKg <= 10) return 800;
        if (weightKg <= 20) return 1000;
        if (weightKg <= 30) return 1200;
        if (weightKg <= 50) return 2000;

        // For weights over 50 kg: 2000 RSD + 35 RSD per additional kg over 50 kg
        const basePrice = 2000;
        const extraWeight = weightKg - 50;
        const additionalCost = extraWeight * 35;

        return basePrice + additionalCost;
      },
    }),

    { name: "cart-store" }
  )
);

export default userCartStore;
