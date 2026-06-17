import { Skeleton } from "@/components/ui/skeleton";

const MedicationDataListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4"
        >
          {/* Left Section */}
          <div className="flex-1 space-y-3">
            {/* Title + Status */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Dose Info */}
            <Skeleton className="h-4 w-72" />

            {/* Instructions */}
            <Skeleton className="h-4 w-full max-w-lg" />

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-md" />
              <Skeleton className="h-7 w-32 rounded-md" />
              <Skeleton className="h-7 w-28 rounded-md" />
            </div>
          </div>

          {/* View Details Button */}
          <div className="shrink-0">
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicationDataListSkeleton;
