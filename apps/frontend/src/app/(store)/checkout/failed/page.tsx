import CheckoutFailed from "@/components/checkout/checkout-failed";

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <CheckoutFailed />
        </div>
      </div>
    </div>
  );
}
