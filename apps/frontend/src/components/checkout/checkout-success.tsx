import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckoutSuccess() {
  // In a real app, this would come from URL params or API
  const orderDetails = {
    orderNumber: "ORD-2024-001234",
    email: "customer@example.com",
    total: "$129.99",
    estimatedDelivery: "3-5 business days",
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full dark:bg-green-900/20">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>
      </div>

      {/* Order Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Order Number</p>
              <p className="font-medium">{orderDetails.orderNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <p className="font-medium">{orderDetails.total}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{orderDetails.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium">{orderDetails.estimatedDelivery}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Confirmation Email</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your order details to{" "}
                  {orderDetails.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-muted-foreground">
                  Your order is being prepared and will be shipped within 1-2
                  business days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-muted" />
              <div>
                <p className="font-medium">Shipping Updates</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          Track Your Order
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button className="flex items-center gap-2">
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <Separator />

      {/* Support Info */}
      <div className="text-sm text-center text-muted-foreground">
        <p>Need help with your order?</p>
        <p>
          Contact us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-primary hover:underline"
          >
            support@example.com
          </a>{" "}
          or call{" "}
          <a href="tel:+1234567890" className="text-primary hover:underline">
            (123) 456-7890
          </a>
        </p>
      </div>
    </div>
  );
}
