import type React from "react";
import AccountNavigation from "@/components/account/account-navigation";
import AccountHeader from "@/components/account/account-header";
import { getCustomerFromToken } from "@/lib/payload/customer";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCustomerFromToken();

  return (
    <div className="container mx-auto py-4 px-4">
      {/* Compact Header */}
      <AccountHeader customer={customer} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <AccountNavigation />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">{children}</div>
      </div>
    </div>
  );
}
