import { cn } from "@/lib/utils";
import { MainProductImage } from "@/components/products/main-product-image";
// import type * as Commerce from "commerce-kit";
import { formatMoney } from "commerce-kit/currencies";
import { AddToCartButton } from "./add-to-cart-button";
import { CartItem } from "@/store/cart.store";
// import { Product } from "@/lib/payload/payload-types";

export const ProductBottomStickyCard = ({
  cartItem,
  locale,
  show,
}: {
  cartItem: CartItem;
  locale: string;
  show: boolean;
}) => {
  return (
    <div
      tabIndex={show ? 0 : -1}
      className={cn(
        "fixed bottom-0 max-w-[100vw] left-0 right-0 bg-white/90 backdrop-blur-xs border-t py-2 sm:py-4 transition-all duration-300 ease-out z-10",
        show
          ? "transform translate-y-0 shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1),_0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]"
          : "transform translate-y-full"
      )}
    >
      <div className="flex items-center justify-between w-full px-4 mx-auto max-w-7xl gap-x-2 sm:px-6 lg:px-8">
        <div className="flex items-center min-w-0 gap-x-2 sm:gap-x-4">
          <div className="shrink-0">
            {cartItem?.productId && (
              <MainProductImage
                className="object-cover object-center w-16 h-16 rounded-lg bg-neutral-100"
                src={cartItem.images[0]?.url || ""}
                loading="eager"
                priority
                alt=""
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold sm:text-base md:text-lg whitespace-nowrap text-ellipsis overflow-clip">
              {cartItem.name}
            </h3>

            {cartItem.price && (
              <p className="text-xs sm:text-sm">
                {formatMoney({
                  amount: cartItem.price,
                  currency: "USD",
                  locale,
                })}
              </p>
            )}
          </div>
        </div>

        <AddToCartButton
          cartItem={cartItem}
          disabled={cartItem.stock <= 0}
          className="px-3 text-sm sm:text-lg sm:px-8 shrink-0 h-9 sm:h-10"
        />
      </div>
    </div>
  );
};
