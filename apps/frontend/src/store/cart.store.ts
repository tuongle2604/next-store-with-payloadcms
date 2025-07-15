import { create } from "zustand";
import { Media } from "@/types/payload-types";

export interface CartItem {
  productId: number;
  name: string;
  images: Media[];
  price: number;
  stock: number;
  variantId: string;
  quantity: number;
}

interface CartModalStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (product: any) => void;
  clearCart: () => void;
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

const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (cartItem: any) =>
    set((state: CartStore) => handleAddToCart(state, cartItem)),
  removeFromCart: (product: any) =>
    set((state: CartStore) => ({
      cartItems: state.cartItems.filter((item) => item.id !== product.id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

const useCartModal = create<CartModalStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export { useCartStore, useCartModal };
