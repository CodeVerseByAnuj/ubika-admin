import { IAllergies } from "@/api-services/patient/types";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Actions from "./_components/Actions";

export const getColumns = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): ColumnDef<IAllergies>[] => {
  return [
    {
      id: "srNo",
      header: "Sr No",
      cell: ({ row }) => (
        <span className="font-medium">
          {(page - 1) * limit + row.index + 1}
        </span>
      ),
    },

    {
      accessorKey: "allergy_name",
      header: "Allergy",
      cell: ({ row }) => (
        <div className="max-w-55">
          <p className="font-medium truncate">
            {row.original.allergy_name || "N/A"}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "attributes.clinical_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.attributes?.clinical_status || "unknown";

        return (
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-700 border-gray-200"
            }
            variant="outline"
          >
            {status}
          </Badge>
        );
      },
    },

    {
      accessorKey: "attributes.allergy_severity_code",
      header: "Severity",
      cell: ({ row }) => {
        const severity = row.original.attributes?.allergy_severity_code;

        return severity ? (
          <Badge variant="secondary" className="capitalize">
            {severity}
          </Badge>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        );
      },
    },

    {
      accessorKey: "attributes.reaction_description",
      header: "Reaction",
      cell: ({ row }) => (
        <div className="max-w-50 truncate text-sm">
          {row.original.attributes?.reaction_description || "N/A"}
        </div>
      ),
    },

    {
      accessorKey: "effectiveAt",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.effectiveAt;

        return (
          <span className="text-sm">
            {date ? format(new Date(date), "dd MMM yyyy") : "N/A"}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <Actions allergy={row.original} />,
    },
  ];
};
