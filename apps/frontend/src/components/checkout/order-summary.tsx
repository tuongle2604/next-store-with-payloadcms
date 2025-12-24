"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { Lock, ShoppingBag, Loader2 } from "lucide-react";
import CartItems from "../cart/cart-items";
import type { CartItem } from "@/store/cart.store";
import { calculateCartTotal } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "@repo/schemas/form-schemas";

interface OrderSummaryProps {
  onCompleteOrder: (data: CheckoutFormData) => void;
  isFormValid: boolean;
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
}

export function OrderSummary({ onCompleteOrder, isFormValid, cartItems, setCartItems }: OrderSummaryProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  function setItemQuantity(updatedItem: CartItem, quantity: number) {
    const newItems = cartItems
      .map((item) => {
        if (updatedItem.productId === item.productId && updatedItem.variantId === item.variantId) {
          return { ...item, quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems([...newItems]);
  }

  // const removeItem = (id: string) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  const subtotal = calculateCartTotal(cartItems);
  const total = subtotal;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4">{<CartItems items={cartItems} setItemQuantity={setItemQuantity} />}</div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleSubmit(onCompleteOrder)} disabled={isSubmitting}>
          <Lock className="mr-2 h-4 w-4" />
          {isSubmitting ? "Processing Order..." : "Complete Order"}
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          Secure checkout powered by SSL encryption
        </div>
      </CardContent>
    </Card>
  );
}
