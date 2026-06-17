const DataTileSkeleton = () => {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 h-3 w-16 animate-pulse rounded bg-muted" />
      <div className="flex items-center gap-1">
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
        <div className="h-3 w-8 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
};

export default DataTileSkeleton;
