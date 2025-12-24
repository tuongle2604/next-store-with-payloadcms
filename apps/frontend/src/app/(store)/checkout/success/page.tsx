import CheckoutSuccess from "@/components/checkout/checkout-success";

export default function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  return (
    <main className="min-h-screen p-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <CheckoutSuccess />
      </div>
    </main>
  );
}
