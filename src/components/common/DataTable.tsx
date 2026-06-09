import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-gray-50">
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup?.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header?.id}
                  className="font-semibold bg-primary text-white"
                >
                  {header?.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table?.getRowModel()?.rows?.length > 0 ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row?.id}
                className="transition-colors hover:bg-gray-50"
                data-state={row?.getIsSelected() && "selected"}
              >
                {row?.getVisibleCells().map((cell) => (
                  <TableCell key={cell?.id} className="">
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns?.length}
                className="h-24 text-center text-sm text-gray-500"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
