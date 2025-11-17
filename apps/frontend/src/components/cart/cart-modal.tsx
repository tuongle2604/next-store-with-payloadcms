"use client";
import { useEffect, useState } from "react";
import { CartAsideContainer } from "./cart-aside";
import { useCartStore, CartItem } from "@/store/cart.store";
import CartItems from "./cart-items";
import CartSummary from "./cart-summary";
import CartEmpty from "./cart-empty";

export function CartModal() {
  const { cartItems, setCartItems } = useCartStore();
  const [items, setItems] = useState(cartItems);

  function setItemQuantity(updatedItem: CartItem, quantity: number) {
    const newItems = items
      .map((item) => {
        if (
          updatedItem.productId === item.productId &&
          updatedItem.variantId === item.variantId
        ) {
          return { ...item, quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setItems([...newItems]);
  }

  function handleCloseCart() {
    setCartItems(items);
  }

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  return (
    <CartAsideContainer onClose={handleCloseCart}>
      <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-700">
            Shopping Cart
          </h2>
        </div>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <CartItems items={items} setItemQuantity={setItemQuantity} />
        )}
      </div>

      {items.length > 0 && <CartSummary items={items} />}

      {/* {searchParams.add && <CartModalAddSideEffect productId={searchParams.add} />} } */}
    </CartAsideContainer>
  );
}
