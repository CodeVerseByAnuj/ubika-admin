const DataTileSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <div className="h-2.5 w-14 animate-pulse rounded bg-muted" />
        <div className="size-4 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-3 flex items-end gap-1.5">
        <div className="h-7 w-24 animate-pulse rounded bg-muted" />
        <div className="mb-1 h-3 w-6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
};

export default DataTileSkeleton;
