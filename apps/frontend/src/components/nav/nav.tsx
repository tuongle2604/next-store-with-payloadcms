import { CartSummaryNav } from "@/components/nav/cart-summary-nav";
import { NavMenu } from "@/components/nav/nav-menu";
import { SearchNav } from "@/components/nav/search-nav";
import { SeoH1 } from "@/components/ui/seo-h1";
import { YnsLink } from "@/components/ui/yns-link";
import { AccountNav } from "./account-nav";
import { getCustomerFromToken } from "@/lib/payload/customer";

export const Nav = async () => {
  const customer: CurrentCustomer = await getCustomerFromToken();

  return (
    <header className="sticky top-0 z-50 py-4 border-b bg-white/90 backdrop-blur-xs nav-border-reveal">
      <div className="flex flex-row items-center gap-2 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <YnsLink href="/">
          <SeoH1 className="-mt-0.5 whitespace-nowrap text-xl font-bold">
            Your Next Store
          </SeoH1>
        </YnsLink>

        <div className="flex w-auto max-w-full overflow-auto shrink sm:mr-auto max-sm:order-2">
          <NavMenu />
        </div>
        <div className="ml-auto mr-3 sm:ml-0">
          <SearchNav />
        </div>
        <CartSummaryNav />
        <AccountNav customer={customer} />
      </div>
    </header>
  );
};
