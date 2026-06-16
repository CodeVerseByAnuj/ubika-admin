import { Skeleton } from "@/components/ui/skeleton";

const AllergieDataListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="rounded-xl border p-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Status & Severity */}
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
          </div>

          {/* Reaction */}
          <div className="mt-4 rounded-xl border p-3">
            <Skeleton className="h-3 w-32 mb-3" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllergieDataListSkeleton;
