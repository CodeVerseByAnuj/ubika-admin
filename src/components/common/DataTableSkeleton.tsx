import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
}

function DataTableSkeleton({
  columnCount = 5,
  rowCount = 6,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Table>
        {/* Header */}
        <TableHeader className="bg-gray-50">
          <TableRow>
            {Array.from({ length: columnCount }).map((_, index) => (
              <TableHead key={index} className="bg-accent">
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full max-w-30" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTableSkeleton;
