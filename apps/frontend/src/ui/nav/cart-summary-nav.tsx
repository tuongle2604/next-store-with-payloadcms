"use client";
// import { getCartFromCookiesAction } from "@/actions/cart-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { getLocale, getTranslations } from "@/i18n/server";
import { formatMoney } from "@/lib/utils";
// import { calculateCartTotalNetWithoutShipping } from "commerce-kit";
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
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // const t = await getTranslations("Global.nav.cartSummary");
  // const locale = await getLocale();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div>
            <CartLink>
              <ShoppingBagIcon />
              <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs text-center translate-x-1/2 translate-y-1/2 bg-white border-2 rounded-full">
                <span className="sr-only">{"Items in cart"}: </span>
                {totalItems}
              </span>
              <span className="sr-only">
                {total}:{" "}
                {formatMoney({
                  amount: total,
                  currency: "USD",
                  locale: "en-US",
                })}
              </span>
            </CartLink>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={25}>
          <p>{"20 Items in cart"}</p>
          <p>
            {"Total"}:{" "}
            {formatMoney({
              amount: total,
              currency: "USD",
              locale: "en-US",
            })}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
