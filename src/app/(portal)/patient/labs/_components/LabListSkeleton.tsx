import { Skeleton } from "@/components/ui/skeleton";

const LabListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border bg-card p-4"
        >
          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <Skeleton className="h-4 w-32" />

            <div className="flex gap-2">
              <Skeleton className="h-7 w-28 rounded-md" />
              <Skeleton className="h-7 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabListSkeleton;
