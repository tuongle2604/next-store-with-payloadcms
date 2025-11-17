import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutSuccessSkeleton() {
  return (
    <div className="space-y-8">
      {/* Success Header Skeleton */}
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-muted">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-48 h-8 mx-auto" />
          <Skeleton className="h-4 mx-auto w-80" />
        </div>
      </div>

      {/* Order Details Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="w-32 h-6" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What's Next Card Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-28" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="w-full h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Skeleton className="w-40 h-10" />
        <Skeleton className="w-40 h-10" />
      </div>

      <Separator />

      {/* Support Info Skeleton */}
      <div className="space-y-2 text-center">
        <Skeleton className="w-48 h-4 mx-auto" />
        <Skeleton className="h-4 mx-auto w-80" />
      </div>
    </div>
  );
}
