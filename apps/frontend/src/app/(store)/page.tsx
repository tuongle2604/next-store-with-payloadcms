import { publicUrl } from "@/env.mjs";
import { getHomePage, getProducts } from "@/lib/payload";
import { Media } from "@/lib/payload/payload-types";
import StoreConfig from "@/store.config";
import { CategoryBox } from "@/ui/category-box";
import { ProductList } from "@/ui/products/product-list";
import { YnsLink } from "@/ui/yns-link";
import Image from "next/image";
import type { Metadata } from "next/types";

export const metadata = {
  alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
  // const products = await Commerce.productBrowse({ first: 6 });
  const [homePage, products] = await Promise.all([
    getHomePage(),
    getProducts(),
  ]);
  // const homePage = await getHomePage();
  // const products = await getProducts();

  if (!homePage) {
    return null;
  }

  const { hero } = homePage;
  const { links, media, title, description } = hero;
  const actionLink = links?.[0]?.link;
  const mediaUrl = (media as Media).url || "";

  return (
    <main>
      <section className="py-8 rounded bg-neutral-100 sm:py-12">
        <div className="grid items-center grid-cols-1 gap-8 px-8 mx-auto justify-items-center sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {title}
            </h2>
            <p className="text-pretty text-neutral-600">{description}</p>
            <YnsLink
              className="inline-flex items-center justify-center h-10 px-6 font-medium transition-colors rounded-full bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
              href={actionLink?.url || ""}
            >
              {actionLink?.label}
            </YnsLink>
          </div>
          <Image
            alt="Cup of Coffee"
            loading="eager"
            priority={true}
            className="rounded"
            height={450}
            width={450}
            src={mediaUrl}
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 640px) 70vw, 450px"
          />
        </div>
      </section>

      <ProductList products={products} />

      <section className="w-full py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {StoreConfig.categories.map(({ slug, image: src }) => (
            <CategoryBox key={slug} categorySlug={slug} src={src} />
          ))}
        </div>
      </section>
    </main>
  );
}
