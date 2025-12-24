import { getTranslations } from "@/i18n/server";
import { deslugify } from "@/lib/utils";
import { ProductList } from "@/components/products/product-list";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { getProducts, getProductsByCategory } from "@/lib/payload";
// export const generateMetadata = async (props: {
// 	params: Promise<{ slug: string }>;
// }): Promise<Metadata> => {
// 	const params = await props.params;
// 	const products = await Commerce.productBrowse({
// 		first: 100,
// 		filter: { category: params.slug },
// 	});

// 	if (products.length === 0) {
// 		return notFound();
// 	}

// 	const t = await getTranslations("/category.metadata");

// 	return {
// 		title: t("title", { categoryName: deslugify(params.slug) }),
// 		alternates: { canonical: `${publicUrl}/category/${params.slug}` },
// 	};
// };

export const revalidate = 3600;

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const products = await getProductsByCategory(params.slug, { limit: 20 });
  console.log("rerender CategoryPage");

  if (products.length === 0) {
    return notFound();
  }

  // const t = await getTranslations("/category.page");

  return (
    <main className="pb-8">
      <h1 className="text-foreground text-3xl leading-none font-bold tracking-tight">
        {deslugify(params.slug)}
        {/* <div className="text-lg font-semibold text-muted-foreground">
          {t("title", { categoryName: deslugify(params.slug) })}
        </div> */}
      </h1>
      <ProductList products={products} />
    </main>
  );
}
