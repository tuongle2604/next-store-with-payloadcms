"use client";
import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

interface PaymentSectionProps {
  onCardError: (error: string | null) => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);
console.log(
  "Stripe Publishable Key:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export function PaymentForm({ onCardError }: PaymentSectionProps) {
  // const cardElementOptions = {
  //   style: {
  //     base: {
  //       fontSize: "16px",
  //       color: "#424770",
  //       "::placeholder": {
  //         color: "#aab7c4",
  //       },
  //     },
  //     invalid: {
  //       color: "#9e2146",
  //     },
  //   },
  // };

  return (
    <Elements stripe={stripePromise}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-element">Card Details *</Label>
            <div className="p-3 border rounded-md bg-background">
              {/* <PaymentElement /> */}
              {/* <CardElement
                id="card-element"
                onChange={(event) => {
                  onCardError(event.error ? event.error.message : null);
                }}
              /> */}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Your payment information is secure and encrypted
          </div>
        </CardContent>
      </Card>
    </Elements>
  );
}
