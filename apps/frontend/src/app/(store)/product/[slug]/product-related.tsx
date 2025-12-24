import Image from "next/image";
import { getRelatedProducts } from "@/lib/payload";
import { YnsLink } from "@/components/ui/yns-link";
import { getImagFromProduct } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";

export default async function ProductRelated({
  tagIds,
  productId,
}: {
  tagIds: number[] | undefined;
  productId: number;
}) {
  const relatedProducts = await getRelatedProducts(tagIds, productId);

  if (!relatedProducts) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {relatedProducts.map((product) => {
          return (
            <div key={product.id} className="bg-card group overflow-hidden rounded shadow-sm">
              <YnsLink href={`/product/${product.slug}`} className="block" prefetch={false}>
                <Image
                  className={
                    "w-full rounded-lg bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-80"
                  }
                  src={product.thumbnail || ""}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  alt=""
                />
              </YnsLink>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  <YnsLink
                    href={getImagFromProduct(product)?.url || ""}
                    className="hover:text-primary"
                    prefetch={false}
                  >
                    {product.name}
                  </YnsLink>
                </h3>
                <div className="flex items-center justify-between">
                  <span>
                    {formatMoney({
                      amount: product.price,
                      currency: "USD",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
