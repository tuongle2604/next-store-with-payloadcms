import { YnsLink } from "@/components/ui/yns-link";
import Image from "next/image";
import { Search } from "@repo/cms/types";

export const ProductListSearch = async ({ results }: { results: Search[] }) => {
  const blurDataURL =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg==";

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => {
          return (
            <li key={result.id} className="group">
              <YnsLink href={`/product/${result.slug}`}>
                <article className="overflow-hidden bg-white">
                  <div className="w-full overflow-hidden rounded-lg aspect-square bg-neutral-100">
                    <Image
                      className="object-cover object-center w-full transition-opacity group-hover:rotate hover-perspective bg-neutral-100 group-hover:opacity-75"
                      src={result?.thumbnail || ""}
                      width={768}
                      height={768}
                      loading={"lazy"}
                      priority={false}
                      sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
                      alt={result?.title || ""}
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      unoptimized
                    />
                  </div>
                  <h2 className="text-lg font-medium text-neutral-700">{result.title}</h2>
                </article>
              </YnsLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
