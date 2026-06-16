import { Skeleton } from "@/components/ui/skeleton";

const AppointmentDataListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>

            <Skeleton className="h-7 w-24 rounded-full" />
          </div>

          {/* Location */}
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-52" />
          </div>

          {/* Date & Time */}
          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Footer */}
          <div className="mt-4 border-t pt-3 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentDataListSkeleton;
