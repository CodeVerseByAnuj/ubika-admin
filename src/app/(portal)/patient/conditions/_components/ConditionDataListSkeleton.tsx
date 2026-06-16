import { Skeleton } from "@/components/ui/skeleton";

const ConditionDataListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3 flex-1">
              <Skeleton className="h-11 w-11 rounded-xl shrink-0" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          {/* Details Box */}
          <div className="mt-4 rounded-xl border p-3 space-y-3">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 border-t pt-3">
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConditionDataListSkeleton;
