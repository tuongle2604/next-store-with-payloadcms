import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { IntlClientProvider } from "@/i18n/client";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "@/i18n/server";
// import(`../../messages/${await getLocale()}.json`)
import messages from "../../messages/en-US.json";
import { Analytics } from "@vercel/analytics/next";
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Global.metadata");
  return {
    title: "Next Store",
    description: t("description"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
  };
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const messages = await getMessages();
  return (
    <html lang={"en-US"} className="h-full antialiased">
      <body className="flex flex-col min-h-full">
        <IntlClientProvider messages={messages} locale={"en-US"}>
          <div className="flex flex-col flex-1 min-h-full bg-white" vaul-drawer-wrapper="">
            {children}
          </div>
          <Toaster position="bottom-right" offset={10} richColors />
        </IntlClientProvider>
        {/* {env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
					<Script
						async
						src="/stats/script.js"
						data-host-url={publicUrl + "/stats"}
						data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
					/>
				)} */}
        <Analytics />
      </body>
    </html>
  );
}
