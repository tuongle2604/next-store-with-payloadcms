import { cn, getVariantName } from "@/lib/utils";
import { YnsLink } from "@/components/ui/yns-link";
import { Product } from "@/lib/payload/payload-types";

export default function ProductVariant({
  product,
  selectedVariant,
}: {
  product: Product;
  selectedVariant: NonNullable<Product["variants"]>[number];
}) {
  if (!product.variants || product.variants.length <= 1) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <p className="text-base font-medium" id="variant-label">
        Variant
      </p>
      <ul role="list" className="grid grid-cols-4 gap-2" aria-labelledby="variant-label">
        {product.variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            variant && (
              <li key={variant.id}>
                <YnsLink
                  scroll={false}
                  prefetch={true}
                  href={`/product/${product.slug}?variant=${getVariantName(variant)}`}
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-md border p-2 transition-colors hover:bg-neutral-100",
                    isSelected && "border-black bg-neutral-50 font-medium",
                  )}
                  aria-selected={isSelected}
                >
                  {getVariantName(variant)}
                </YnsLink>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
