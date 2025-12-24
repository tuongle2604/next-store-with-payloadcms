"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function EmptyCartCheckout() {
  return (
    <div className="py-10 md:py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="py-6 md:py-16">
            <div className="text-center">
              <ShoppingCart className="mx-auto mb-6 h-16 w-16 text-gray-300 md:h-24 md:w-24" />
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
              <p className="mx-auto mb-8 max-w-md text-sm text-gray-600 md:text-base">
                Looks like you haven't added any items to your cart yet. Browse our products and add some
                items to get started.
              </p>
              <Button size="lg" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
