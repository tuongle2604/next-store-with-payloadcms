import { getLocale } from "@/i18n/server";
import { formatMoney } from "@/lib/utils";
import { JsonLd, mappedProductsToJsonLd } from "@/components/ui/json-ld";
import { YnsLink } from "@/components/ui/yns-link";
import type * as Commerce from "commerce-kit";
import Image from "next/image";
import { Product } from "@/lib/payload/payload-types";

export const ProductList = async ({ products }: { products: Product[] }) => {
  const locale = await getLocale();

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => {
          const variant = product?.variants?.[0];
          const image = variant?.images?.[0];
          const price = variant?.price;

          return (
            <li key={product.id} className="group">
              <YnsLink href={`/product/${product.slug}`}>
                <article className="overflow-hidden bg-white">
                  {image && (
                    <div className="w-full overflow-hidden rounded-lg aspect-square bg-neutral-100">
                      <Image
                        className="object-cover object-center w-full transition-opacity group-hover:rotate hover-perspective bg-neutral-100 group-hover:opacity-75"
                        src={image?.url}
                        width={768}
                        height={768}
                        loading={idx < 3 ? "eager" : "lazy"}
                        priority={idx < 3}
                        sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="p-2">
                    <h2 className="text-xl font-medium text-neutral-700">
                      {product.name}
                    </h2>
                    <footer className="text-base font-normal text-neutral-900">
                      {/* {price} */}
                      {price && (
                        <p>
                          {formatMoney({
                            amount: price,
                            currency: "USD",
                            locale,
                          })}
                        </p>
                      )}
                    </footer>
                  </div>
                </article>
              </YnsLink>
            </li>
          );
        })}
      </ul>
      {/* <JsonLd jsonLd={mappedProductsToJsonLd(products)} /> */}
    </>
  );
};
