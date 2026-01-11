import { ProductListSearch } from "@/components/products/product-list-search";
import { ProductNotFound } from "@/components/products/product-not-found";
import { RedirectType, redirect } from "next/navigation";
// import { searchProducts } from "@/lib/payload/search";
import { Suspense } from "react";
import { ProductListSkeleton } from "@/components/products/product-list-skeleton";

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;

  if (!query) {
    return redirect("/", RedirectType.replace);
  }

  // const results = await searchProducts(query);

  return (
    <main>
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
        {`Searching for "${query}"`}
      </h1>

      <Suspense fallback={<ProductListSkeleton itemsLength={6} />}>
        <ProductListSearch query={query} />
        {/* {results?.length ? <ProductListSearch results={results} /> : <ProductNotFound query={query} />} */}
      </Suspense>
    </main>
  );
}
