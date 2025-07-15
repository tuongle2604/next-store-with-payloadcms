"use client";
// import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { getLocale, getTranslations } from "@/i18n/server";
import { formatMoney, formatProductName } from "@/lib/utils";
import { YnsLink } from "@/ui/yns-link";
// import { calculateCartTotalNetWithoutShipping } from "commerce-kit";
import { calculateCartTotal } from "@/lib/utils";
import Image from "next/image";
import { CartAsideContainer } from "./cart-aside";
import { useCartStore, CartItem } from "@/store/cart.store";
import Counter from "@/ui/counter";

export function CartModalPage() {
  const { cartItems } = useCartStore();
  const [items, setItems] = useState(cartItems);

  // const searchParams = await props.searchParams;
  // const originalCart = await getCartFromCookiesAction();
  // TODO fix type
  // const cart = await Commerce.cartAddOptimistic({ add: searchParams.add, cart: originalCart! });
  // const cart = originalCart;

  // if (!cart || cart.lines.length === 0) {
  //   return null;
  // }

  // const currency = cart.lines[0]!.product.default_price.currency;
  // const total = calculateCartTotalNetWithoutShipping(cart);
  // const t = await getTranslations("/cart.modal");
  // const locale = await getLocale();

  function setItemQuantity(updatedItem: CartItem, quantity: number) {
    const newItems = items.map((item) => {
      if (
        updatedItem.productId === item.productId &&
        updatedItem.variantId === item.variantId
      ) {
        return { ...item, quantity };
      }
      return item;
    });

    setItems([...newItems]);
  }

  useEffect(() => {
    // Update items whenever cartItems change
    setItems(cartItems);
  }, [cartItems]);

  return (
    <CartAsideContainer>
      <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-700">
            Shopping Cart
          </h2>
          <YnsLink
            replace
            href="/cart"
            className="text-sm underline text-muted-foreground"
          >
            (open full view)
          </YnsLink>
        </div>

        <div className="mt-8">
          <ul role="list" className="-my-6 divide-y divide-neutral-200">
            {items.map((cartItem) => (
              <li
                key={cartItem.productId}
                className="grid grid-cols-[5rem_1fr_max-content] grid-rows-[auto_auto] gap-x-4 gap-y-2 py-6"
              >
                {cartItem.images[0] ? (
                  <div className="col-span-1 row-span-2 bg-neutral-100">
                    <Image
                      className="object-cover rounded-md aspect-square"
                      src={cartItem.images[0].url || ""}
                      width={80}
                      height={80}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="col-span-1 row-span-2" />
                )}

                <h3 className="-mt-1 font-semibold leading-tight">
                  {formatProductName(cartItem.name, cartItem.variantId)}
                </h3>
                <p className="text-sm font-medium leading-none">
                  {formatMoney({
                    amount: cartItem.price,
                    currency: "USD",
                    locale: "en-US",
                  })}
                </p>
                <div className="self-end text-sm font-medium text-muted-foreground">
                  {/* Quantity: {cartItem.quantity} */}
                  <Counter
                    number={cartItem.quantity}
                    setNumber={(number) => setItemQuantity(cartItem, number)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-4 py-6 border-t border-neutral-200 sm:px-6">
        <div
          id="cart-overlay-description"
          className="flex justify-between text-base font-medium text-neutral-900"
        >
          <p>Total</p>
          <p>
            {formatMoney({
              amount: calculateCartTotal(items),
              currency: "USD",
              locale: "en-US",
            })}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-neutral-500">
          Shipping and taxes will be added at the next step
        </p>
        <Button
          asChild={true}
          size={"lg"}
          className="w-full mt-6 text-lg rounded-full"
        >
          <YnsLink href="/cart">Go to payment</YnsLink>
        </Button>
      </div>
      {/* {searchParams.add && <CartModalAddSideEffect productId={searchParams.add} />} } */}
    </CartAsideContainer>
  );
}
