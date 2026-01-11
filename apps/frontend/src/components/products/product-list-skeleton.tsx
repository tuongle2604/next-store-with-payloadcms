import { Skeleton } from "@/components/ui/skeleton";

export const ProductListSkeleton = async ({ itemsLength = 6 }: { itemsLength: number }) => {
  return (
    <>
      <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(itemsLength)].map((o, index) => {
          return (
            <li className="group" key={index}>
              <div className="flex flex-col w-full space-y-2 rounded-lg">
                <Skeleton className="w-full rounded-lg aspect-square" />
                <div className="space-y-2">
                  <Skeleton className="w-2/3 h-8" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
