"use client";

import {
  AlertCircle,
  CreditCard,
  RefreshCw,
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function CheckoutFailed() {
  const router = useRouter();

  const handleRetryCheckout = () => {
    router.push("/");
  };

  const handleContactSupport = () => {
    // In a real app, this might open a support chat or redirect to contact page
    window.location.href = "mailto:support@example.com";
  };

  return (
    <div className="space-y-6">
      {/* Failed Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Failed</h1>
          <p className="mt-2 text-muted-foreground">
            We couldn't process your payment. Don't worry, no charges were made.
          </p>
        </div>
      </div>

      {/* Error Details */}
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Payment declined:</strong> Your card was declined. Please
          check your payment details and try again.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Button
          onClick={handleRetryCheckout}
          className="w-full h-12 text-base"
          size="lg"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-full h-12 text-base"
          size="lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>

      {/* Common Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Common Issues & Solutions
          </CardTitle>
          <CardDescription>
            Here are some common reasons why payments fail and how to fix them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="pl-4 border-l-4 border-blue-500">
              <h4 className="font-medium">Insufficient Funds</h4>
              <p className="text-sm text-muted-foreground">
                Check your account balance or try a different payment method
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-500">
              <h4 className="font-medium">Incorrect Card Details</h4>
              <p className="text-sm text-muted-foreground">
                Verify your card number, expiry date, and CVV are correct
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-500">
              <h4 className="font-medium">Bank Security Block</h4>
              <p className="text-sm text-muted-foreground">
                Contact your bank to authorize the transaction
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-500">
              <h4 className="font-medium">Billing Address Mismatch</h4>
              <p className="text-sm text-muted-foreground">
                Ensure your billing address matches your card statement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Try a Different Payment Method</CardTitle>
          <CardDescription>
            You can use any of these payment options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="p-3 text-center border rounded-lg">
              <div className="mb-1 text-2xl">💳</div>
              <div className="text-sm font-medium">Credit Card</div>
            </div>
            <div className="p-3 text-center border rounded-lg">
              <div className="mb-1 text-2xl">💰</div>
              <div className="text-sm font-medium">Debit Card</div>
            </div>
            <div className="p-3 text-center border rounded-lg">
              <div className="mb-1 text-2xl">📱</div>
              <div className="text-sm font-medium">Digital Wallet</div>
            </div>
            <div className="p-3 text-center border rounded-lg">
              <div className="mb-1 text-2xl">🏦</div>
              <div className="text-sm font-medium">Bank Transfer</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Our support team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              onClick={handleContactSupport}
              className="justify-start w-full bg-transparent"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "tel:+1-800-123-4567")}
              className="justify-start w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call (800) 123-4567
            </Button>
          </div>
          <div className="mt-4 text-sm text-center text-muted-foreground">
            Available 24/7 • Average response time: 2 hours
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
