import { getTranslations } from "@/i18n/server";
import { ProductList } from "@/components/products/product-list";
import * as Commerce from "commerce-kit";
import type { Metadata } from "next/types";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("/products.metadata");
  return {
    title: t("title"),
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/products` },
  };
};

export default async function AllProductsPage() {
  const products = await Commerce.productBrowse({ first: 100 });
  const t = await getTranslations("/products.page");

  return (
    <main className="pb-8">
      <h1 className="text-foreground text-3xl leading-none font-bold tracking-tight">
        {t("title")}
      </h1>
      <ProductList products={products} />
    </main>
  );
}
