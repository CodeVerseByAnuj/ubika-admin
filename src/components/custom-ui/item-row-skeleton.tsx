const ItemRowSkeleton = () => {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card p-3 animate-pulse">
      {/* Icon Tile Skeleton */}
      <div className="h-8.5 w-8.5 shrink-0 rounded-md bg-muted" />
      {/* Content Skeleton */}
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
      </div>
      {/* Trail Chip Skeleton */}
      <div className="h-6 w-16 rounded-full bg-muted" />
    </div>
  );
};

export default ItemRowSkeleton;
