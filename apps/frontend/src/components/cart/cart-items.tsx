import Image from "next/image";
import { formatMoney, formatProductName } from "@/lib/utils";
import Counter from "@/components/ui/counter";
import type { CartItem } from "@/store/cart.store";

interface CartItemsProps {
  items: CartItem[];
  setItemQuantity: (updatedItem: CartItem, quantity: number) => void;
}

export default function CartItems({ items, setItemQuantity }: CartItemsProps) {
  return (
    <ul role="list" className="divide-y divide-neutral-200">
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
            {cartItem.name}
            {/* {formatProductName(cartItem.name, cartItem.variantId)} */}
          </h3>
          <p className="text-sm font-medium leading-none">
            {formatMoney({
              amount: cartItem.price,
              currency: "USD",
              locale: "en-US",
            })}
          </p>
          <div className="self-end text-sm font-medium text-muted-foreground">
            <Counter
              number={cartItem.quantity}
              setNumber={(number) => setItemQuantity(cartItem, number)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
