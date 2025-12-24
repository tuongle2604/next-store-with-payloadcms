import { Button } from "@/components/ui/button";
import { formatMoney, formatProductName } from "@/lib/utils";
import { calculateCartTotal } from "@/lib/utils";
import { YnsLink } from "@/components/ui/yns-link";
import { CartItem } from "@/store/cart.store";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  return (
    <div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
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
      <p className="mt-0.5 text-sm text-neutral-500">Shipping and taxes will be added at the next step</p>
      <Button asChild={true} size={"lg"} className="mt-6 w-full rounded-full text-lg">
        <YnsLink href="/checkout">Go to payment</YnsLink>
      </Button>
    </div>
  );
}
