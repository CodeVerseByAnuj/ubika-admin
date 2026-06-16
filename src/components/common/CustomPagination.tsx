import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  isRowSelect?: boolean;
}

const CustomPagination = ({
  pagination,
  onPageChange,
  onLimitChange,
  isRowSelect = false,
}: PaginationProps) => {
  const { page, totalPages, limit, total } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const generatePages = () => {
    const pages: (number | string)[] = [];

    // First page
    pages.push(1);

    // Left dots
    if (page > 3) {
      pages.push("left-ellipsis");
    }

    // Middle pages
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    // Right dots
    if (page < totalPages - 2) {
      pages.push("right-ellipsis");
    }

    // Last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  const pages = generatePages();

  return (
    <div className="p-3 border rounded-md bg-background">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {/* Info */}
          <div className="text-sm text-muted-foreground">
            Showing page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
            {" • "}
            Total <span className="font-medium">{total}</span> items
          </div>

          {/* Limit Selector */}
          {total > 10 && isRowSelect && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows:</span>

              <Select
                value={String(limit)}
                onValueChange={(value) => onLimitChange?.(Number(value))}
              >
                <SelectTrigger className="w-22.5 h-9">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>

                <SelectContent>
                  {[10, 20, 50, 100].map((item) => (
                    <SelectItem key={item} value={String(item)}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="w-fit m-0">
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page > 1) {
                      onPageChange?.(page - 1);
                    }
                  }}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {pages.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={page === item}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange?.(item);
                      }}
                      className="cursor-pointer"
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page < totalPages) {
                      onPageChange?.(page + 1);
                    }
                  }}
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
