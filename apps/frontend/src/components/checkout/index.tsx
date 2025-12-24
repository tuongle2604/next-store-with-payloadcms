"use client";

import { useState } from "react";
import { OrderSummary } from "./order-summary";
import { useCartStore } from "@/store/cart.store";
import { EmptyCartCheckout } from "./empty-cart-checkout";
import CheckoutForm from "./checkout-form";
import { FormProvider, useForm } from "react-hook-form";
import { checkoutFormSchema } from "@repo/schemas/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CheckoutFormData } from "@repo/schemas/form-schemas";
import { checkout } from "@/lib/payload/checkout";
import { toast } from "sonner";
import { useSessionStorage } from "usehooks-ts";
import type { CustomerProfile } from "@/lib/payload/customer";

export function Checkout({ customerProfile }: { customerProfile: CustomerProfile }) {
  const [, setOrder] = useSessionStorage("order", "");

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: customerProfile.fullName || "",
      email: customerProfile.email || "",
      phone: customerProfile.phone || "",
      shippingAddress: "",
      shippingCity: "",
      shippingProvince: "",
      shippingPostalCode: "",
      shippingCountry: "vi",
    },
  });

  const { cartItems, setCartItems } = useCartStore();
  const [contactValid, setContactValid] = useState(false);
  const [shippingValid, setShippingValid] = useState(false);
  const [paymentValid, setPaymentValid] = useState(false);

  const isFormValid = contactValid && shippingValid && paymentValid;
  const isCartEmpty = cartItems.length === 0;

  async function handleCompleteOrder(formData: CheckoutFormData) {
    const payload = {
      cartItems: cartItems,
      shippingInfo: formData,
    };

    const { data, error } = await checkout(payload);

    if (error || !data) {
      console.log("Checkout error:", error?.message);

      toast.error(error?.message || "An error occurred during checkout");
      return;
    }

    setOrder(JSON.stringify({ ...payload, orderId: data.orderId }));
    window.location.href = data.url;
  }

  if (isCartEmpty) {
    return <EmptyCartCheckout />;
  }

  function onCardError(error: string | null) {
    if (error) {
    }
  }

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
          <p className="mt-2 text-gray-600">
            Enter your details below to finalize your purchase. <br />
            Your information is secure and encrypted.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              <CheckoutForm />
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <OrderSummary
                onCompleteOrder={handleCompleteOrder}
                isFormValid={isFormValid}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
