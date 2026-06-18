import { Skeleton } from "@/components/ui/skeleton";

const LetterDataListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-4">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-56" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="mt-3 flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>

          {/* Content Preview */}
          <div className="mt-4 rounded-xl border p-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>

          {/* Dates */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LetterDataListSkeleton;
