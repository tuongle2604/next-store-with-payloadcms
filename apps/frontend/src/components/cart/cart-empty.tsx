"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";

export default function CartEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full space-y-6 py-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <Package className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>
      </div>

      <div className="space-y-3 w-full max-w-sm">
        <Button className="w-full">Continue Shopping</Button>
        <Button variant="outline" className="w-full bg-transparent">
          Browse Categories
        </Button>
      </div>
    </div>
  );
}
