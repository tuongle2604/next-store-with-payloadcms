"use client";
// import { getCartFromCookiesAction } from "@/actions/cart-actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatMoney } from "@/lib/utils";
import { calculateCartTotal } from "@/lib/utils";
import { ShoppingBagIcon } from "lucide-react";
// import { Suspense } from "react";
import { CartLink } from "./cart-link";
import { useCartStore } from "@/store/cart.store";

// const CartFallback = () => (
//   <div className="w-6 h-6 opacity-30">
//     <ShoppingBagIcon />
//   </div>
// );

// export const CartSummaryNav = () => {
//   return (
//     <Suspense fallback={<CartFallback />}>
//       <CartSummaryNavInner />
//     </Suspense>
//   );
// };

export const CartSummaryNav = () => {
  const { cartItems } = useCartStore();
  // const cart = await getCartFromCookiesAction();
  // if (!cart) {
  // 	return <CartFallback />;
  // }
  // if (!cart.lines.length) {
  // 	return <CartFallback />;
  // }

  const total = calculateCartTotal(cartItems);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div>
            <CartLink>
              <ShoppingBagIcon />
              <span className="absolute right-0 bottom-0 inline-flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 bg-white text-center text-xs">
                <span className="sr-only">{"Items in cart"}: </span>
                {totalItems}
              </span>
              <span className="sr-only">
                {total}:{" "}
                {formatMoney({
                  amount: total,
                  currency: "USD",
                })}
              </span>
            </CartLink>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={25}>
          <p>{`${totalItems} Items in cart`}</p>
          <p>
            {"Total"}:{" "}
            {formatMoney({
              amount: total,
              currency: "USD",
            })}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
