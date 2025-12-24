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
import { getTranslations } from "@/i18n/server";
import { getProductDetail } from "@/lib/payload/product";
import { cn, deslugify, formatMoney, formatProductName } from "@/lib/utils";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import { JsonLd, mappedProductToJsonLd } from "@/components/ui/json-ld";
import { MainProductImage } from "@/components/products/main-product-image";
import { StickyBottom } from "@/components/ui/sticky-bottom";
import { YnsLink } from "@/components/ui/yns-link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next/types";
import { Suspense } from "react";
import ProductRelated from "./product-related";
import { getVariantName } from "@/lib/utils";
import ProductVariant from "./product-variant";
// import { Product } from "@/types/payload-types";
import { getImageFromVariant } from "@/lib/utils";
import { Tag, Product, Media, Category } from "@repo/cms/types";
import { CartItem } from "@/store/cart.store";

// import { Tag } from "@/lib/payload/payload-types";
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
export const revalidate = 3600;

export default async function SingleProductPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ variant?: string; image?: string }>;
}) {
  console.log("rerender product page");
  const params = await props.params;
  const searchParams = await props.searchParams;
  const product = await getProductDetail(params.slug);

  if (!product) {
    return notFound();
  }

  const t = await getTranslations("/product.page");
  const { variant } = searchParams;
  const category = product.category as Category;
  let selectedVariant = product.variants?.[0];
  const images = (product.variants?.map((v) => v.images).flat() || []) as Media[];

  if (searchParams.variant) {
    selectedVariant = product.variants?.find((v) => getVariantName(v) === variant);
  }

  if (!selectedVariant) {
    return null;
  }

  const cartItem: CartItem = {
    productId: product.id,
    name: product.name || "",
    images: (selectedVariant.images || []) as Media[],
    price: selectedVariant.price,
    stock: selectedVariant.stock || 0,
    variantId: selectedVariant?.id || "",
    sku: selectedVariant.sku || "",
    quantity: 1,
  };

  return (
    <article className="pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="inline-flex min-h-12 min-w-12 items-center justify-center">
              <YnsLink href="/products">{t("allProducts")}</YnsLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="inline-flex min-h-12 min-w-12 items-center justify-center" asChild>
                  <YnsLink href={`/category/${category.slug}`}>{category.title}</YnsLink>
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
                <BreadcrumbPage>{getVariantName(selectedVariant)}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* <StickyBottom cartItem={cartItem} locale={locale}> */}
      <div className="mt-4 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8">
          <h1 className="text-foreground text-3xl leading-none font-bold tracking-tight">{product.name}</h1>
          {selectedVariant && (
            <p className="text-foreground/70 mt-2 text-2xl leading-none font-medium tracking-tight">
              {formatMoney({
                amount: selectedVariant.price,
                currency: "USD",
              })}
            </p>
          )}
          <div className="mt-2">
            {selectedVariant?.stock && selectedVariant.stock <= 0 && <div>Out of stock</div>}
          </div>
        </div>

        <div className="lg:col-span-7 lg:row-span-3 lg:row-start-1">
          <h2 className="sr-only">{t("imagesTitle")}</h2>

          <div className="grid gap-4 lg:grid-cols-3 [&>*:first-child]:col-span-3">
            <MainProductImage
              key={getImageFromVariant(selectedVariant)?.id}
              className="w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity"
              src={getImageFromVariant(selectedVariant)?.url || ""}
              loading="eager"
              priority
              alt=""
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4 lg:grid-cols-5 lg:gap-4">
            {images.map((image, idx) => {
              return (
                <Image
                  key={image?.id || idx}
                  className="w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity"
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
          <ProductVariant product={product} selectedVariant={selectedVariant} />

          <AddToCartButton cartItem={cartItem} disabled={false} />
        </div>
      </div>
      {/* </StickyBottom> */}

      <Suspense>
        <ProductRelated tagIds={product.tags?.map((o) => (o as Tag).id)} productId={product.id} />
        {/* <SimilarProducts id={product.id} /> */}
      </Suspense>

      <Suspense>{/* <ProductImageModal images={images} /> */}</Suspense>

      {/* <JsonLd jsonLd={mappedProductToJsonLd(product)} /> */}
    </article>
  );
}
