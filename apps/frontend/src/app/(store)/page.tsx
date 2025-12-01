import { getHomePage, getProducts } from "@/lib/payload";
import { Media } from "@repo/cms/types";
import StoreConfig from "@/store.config";
import { CategoryBox } from "@/components/ui/category-box";
import { ProductList } from "@/components/products/product-list";
import { YnsLink } from "@/components/ui/yns-link";
import Image from "next/image";
import type { Metadata } from "next/types";

export const metadata = {
  alternates: { canonical: process.env.NEXT_PUBLIC_BASE_URL },
} satisfies Metadata;

export default async function Home() {
  const [homePage, products] = await Promise.all([
    getHomePage(),
    getProducts({ limit: 6, sort: "createdAt_DESC" }),
  ]);

  if (!homePage || !homePage.hero) {
    return null;
  }
  const { links, media, title, description } = homePage.hero;
  const actionLink = links?.[0]?.link;
  const mediaUrl = (media as Media).url || "";

  return (
    <main>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {title}
            </h2>
            <p className="text-pretty text-neutral-600">{description}</p>
            <YnsLink
              className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:ring-1 focus:ring-neutral-950 focus:outline-hidden"
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
