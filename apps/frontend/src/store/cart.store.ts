import { create } from "zustand";
import { Media } from "@repo/cms/types";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  name: string;
  images: Media[];
  price: number;
  stock: number;
  variantId: string;
  quantity: number;
  sku: string;
}

interface CartStore {
  isOpenCart: boolean;
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (product: any) => void;
  clearCart: () => void;
  setCartItems: (items: CartItem[]) => void;
  setIsOpenCart: (flag: boolean) => void;
}

function handleAddToCart(state: CartStore, cartItem: CartItem) {
  const existingItem = state.cartItems.find(
    (item) =>
      item.productId === cartItem.productId &&
      item.variantId === cartItem.variantId
  );

  if (existingItem) {
    return {
      cartItems: state.cartItems.map((item) =>
        item.productId === cartItem.productId &&
        item.variantId === cartItem.variantId
          ? { ...item, quantity: item.quantity + cartItem.quantity }
          : item
      ),
    };
  }

  return { cartItems: [...state.cartItems, cartItem] };
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      isOpenCart: false,
      cartItems: [],
      addToCart: (cartItem: any) =>
        set((state: CartStore) => handleAddToCart(state, cartItem)),
      removeFromCart: (product: any) =>
        set((state: CartStore) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== product.id
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
      setCartItems: (items: CartItem[]) => set({ cartItems: items }),
      setIsOpenCart: (flag) => set((state) => ({ isOpenCart: flag })),
    }),
    {
      name: "cart",
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

export { useCartStore };
