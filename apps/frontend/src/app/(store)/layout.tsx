import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/footer/footer";
import { Nav } from "@/components/nav/nav";
// import { CartModalPage } from "./cart/cart-modal";
import { CartModal } from "@/components/cart/cart-modal";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <TooltipProvider>
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-2 pb-6 sm:px-6 lg:px-8 lg:pt-6">
          {children}
          <CartModal />
        </main>
        <Footer />
      </TooltipProvider>
      {/* <JsonLd
				jsonLd={accountToWebsiteJsonLd({
					account: accountResult?.account,
					logoUrl: logoLink?.url,
				})}
			/> */}
    </>
  );
}
