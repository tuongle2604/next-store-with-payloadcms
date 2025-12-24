import type React from "react";
import AccountNavigation from "@/components/account/account-navigation";
import AccountHeader from "@/components/account/account-header";
import { getCustomerFromToken, getCustomer } from "@/lib/payload/customer";
import { redirect } from "next/navigation";
import { CustomerProvider } from "@/contexts/CustomerContext";
import { removeTokenCookie } from "@/lib/payload/auth";
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const { payload: customerProfile, error } = await getCustomerFromToken();

  if (error?.code === "ERR_JWT_EXPIRED") {
    removeTokenCookie();
    redirect("/auth/login");
  }

  if (error?.code === "NO_TOKEN" || !customerProfile?.id) {
    redirect("/auth/login");
  }
  // if (!CustomerProfile?.id) {
  //   redirect("/auth/login");
  // }

  const { data: customer } = await getCustomer(customerProfile?.id);

  if (!customer) {
    return <div className="container mx-auto px-4 py-4">Failed to load customer data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <CustomerProvider customer={customer}>
        <AccountHeader />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <AccountNavigation />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">{children}</div>
        </div>
      </CustomerProvider>
    </div>
  );
}
