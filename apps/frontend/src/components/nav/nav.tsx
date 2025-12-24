import { CartSummaryNav } from "@/components/nav/cart-summary-nav";
import { NavMenu } from "@/components/nav/nav-menu";
import { SearchNav } from "@/components/nav/search-nav";
import { SeoH1 } from "@/components/ui/seo-h1";
import { YnsLink } from "@/components/ui/yns-link";
import { AccountNav } from "./account-nav";

export const Nav = async () => {
  return (
    <header className="nav-border-reveal sticky top-0 z-50 border-b bg-white/90 py-4 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl flex-row items-center gap-2 px-4 sm:px-6 lg:px-8">
        <YnsLink href="/">
          <SeoH1 className="-mt-0.5 text-xl font-bold whitespace-nowrap">Next Store</SeoH1>
        </YnsLink>

        <div className="flex w-auto max-w-full shrink overflow-auto max-sm:order-2 sm:mr-auto">
          <NavMenu />
        </div>
        <div className="mr-3 ml-auto sm:ml-0">
          <SearchNav />
        </div>
        <CartSummaryNav />

        <AccountNav />
      </div>
    </header>
  );
};
