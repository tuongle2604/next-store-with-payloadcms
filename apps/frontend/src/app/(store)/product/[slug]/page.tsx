// import { ProductModel3D } from "@/app/(store)/product/[slug]/product-model3d";
import { ProductImageModal } from "@/app/(store)/product/[slug]/product-image-modal";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { publicUrl } from "@/env.mjs";
import { getLocale, getTranslations } from "@/i18n/server";
import { getProductDetail } from "@/lib/payload/product";
import { getRecommendedProducts } from "@/lib/search/trieve";
import { cn, deslugify, formatMoney, formatProductName } from "@/lib/utils";
// import type { TrieveProductMetadata } from "@/scripts/upload-trieve";
import { AddToCartButton } from "@/ui/add-to-cart-button";
import { JsonLd, mappedProductToJsonLd } from "@/ui/json-ld";
import { Markdown } from "@/ui/markdown";
import { MainProductImage } from "@/ui/products/main-product-image";
import { StickyBottom } from "@/ui/sticky-bottom";
import { YnsLink } from "@/ui/yns-link";
// import * as Commerce from "commerce-kit";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Suspense } from "react";
import ProductRelated from "./product-related";
import { getVariantName } from "@/lib/utils";
import ProductVariant from "./product-variant";
import { Product } from "@/types/payload-types";
import { getImageFromVariant } from "@/lib/utils";
// export const generateMetadata = async (props: {
//   params: Promise<{ slug: string }>;
//   searchParams: Promise<{ variant?: string }>;
// }): Promise<Metadata> => {
//   const searchParams = await props.searchParams;
//   const params = await props.params;
//   const product = await getProductDetail(params.slug);
//   // const variants = await Commerce.productGet({ slug: params.slug });

//   // const selectedVariant = searchParams.variant || variants[0]?.metadata.variant;
//   // const product = variants.find(
//   //   (variant) => variant.metadata.variant === selectedVariant
//   // );
//   if (!product) {
//     return notFound();
//   }
//   const t = await getTranslations("/product.metadata");

//   // const canonical = new URL(`${publicUrl}/product/${product.slug}`);
//   // if (selectedVariant) {
//   //   canonical.searchParams.set("variant", selectedVariant);
//   // }

//   const productName = formatProductName(product.name, product.metadata.variant);

//   return {
//     title: t("title", { productName }),
//     description: product.description,
//     alternates: { canonical },
//   } satisfies Metadata;
// };

export default async function SingleProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const product = await getProductDetail(params.slug);

  if (!product) {
    return notFound();
  }

  const t = await getTranslations("/product.page");
  const locale = await getLocale();
  const { variant } = searchParams;
  const category = product.category;
  let selectedVariant = product.variants?.[0];
  const images = product.variants?.map((v) => v.images).flat() || [];

  if (searchParams.variant) {
    selectedVariant = product.variants?.find(
      (v) => getVariantName(v) === variant
    );
  }

  if (!selectedVariant) {
    return null;
  }

  const cartItem = {
    productId: product.id,
    name: product.name || "",
    images: selectedVariant.images || [],
    price: selectedVariant.price,
    stock: selectedVariant.stock || 0,
    variantId: selectedVariant?.id || "",
    quantity: 1,
  };

  // function getVariantImage(variant: Product["variants"][number]) {
  //   if (!variant.images || variant.images.length === 0) {
  //     return null;
  //   }
  //   const image = variant.images[0];
  //   return image;
  // }

  return (
    <article className="pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="inline-flex items-center justify-center min-h-12 min-w-12"
            >
              <YnsLink href="/products">{t("allProducts")}</YnsLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="inline-flex items-center justify-center min-h-12 min-w-12"
                  asChild
                >
                  <YnsLink href={`/category/${category.slug}`}>
                    {category.title}
                  </YnsLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
          {getVariantName(selectedVariant) && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {getVariantName(selectedVariant)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <StickyBottom cartItem={cartItem} locale={locale}>
        <div className="grid gap-4 mt-4 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
              {product.name}
            </h1>
            {selectedVariant && (
              <p className="mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70">
                {formatMoney({
                  amount: selectedVariant.price,
                  currency: "USD",
                  locale,
                })}
              </p>
            )}
            <div className="mt-2">
              {selectedVariant?.stock && selectedVariant.stock <= 0 && (
                <div>Out of stock</div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
            <h2 className="sr-only">{t("imagesTitle")}</h2>

            <div className="grid gap-4 lg:grid-cols-3 [&>*:first-child]:col-span-3">
              <MainProductImage
                key={getImageFromVariant(selectedVariant)?.id}
                className="object-cover object-center w-full transition-opacity rounded-lg bg-neutral-100"
                src={getImageFromVariant(selectedVariant)?.url || ""}
                loading="eager"
                priority
                alt=""
              />
            </div>
            <div className="grid grid-cols-4 gap-3 gap-4 mt-4 lg:grid-cols-5 lg:gap-4">
              {images.map((image, idx) => {
                return (
                  <Image
                    key={image?.id || idx}
                    className="object-cover object-center w-full transition-opacity rounded-lg bg-neutral-100"
                    src={image?.url || ""}
                    width={160}
                    height={160}
                    sizes="(max-width: 1024x) 33vw, (max-width: 1280px) 20vw, 225px"
                    loading="eager"
                    priority
                    alt=""
                  />
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 lg:col-span-5">
            <section>
              <h2 className="sr-only">{t("descriptionTitle")}</h2>
              <div className="prose text-secondary-foreground">
                <Markdown source={product.description || ""} />
              </div>
            </section>

            <ProductVariant
              product={product}
              selectedVariant={selectedVariant}
            />

            <AddToCartButton cartItem={cartItem} disabled={false} />
          </div>
        </div>
      </StickyBottom>

      <Suspense>
        <ProductRelated tagIds={product.tags?.map((o) => o.id)} />
        {/* <SimilarProducts id={product.id} /> */}
      </Suspense>

      <Suspense>{/* <ProductImageModal images={images} /> */}</Suspense>

      {/* <JsonLd jsonLd={mappedProductToJsonLd(product)} /> */}
    </article>
  );
}
