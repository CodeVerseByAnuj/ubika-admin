import { Skeleton } from "@/components/ui/skeleton";

const LabListSkeleton = () => {
  return (
    <div className="divide-y rounded-xl border bg-card overflow-hidden">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4 px-4 py-3.5">
          <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-4 rounded shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default LabListSkeleton;
