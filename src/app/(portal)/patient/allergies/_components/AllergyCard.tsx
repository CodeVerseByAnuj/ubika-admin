import { Calendar, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IAllergies } from "@/api-services/patient/types";
import { cn } from "@/lib/utils";

const AllergyCard = ({ allergy }: { allergy: IAllergies }) => {
  const status = allergy.attributes.clinical_status;
  const severity = allergy.attributes.allergy_severity_code;

  const getStatusStyles = (statusString: string) => {
    switch (statusString?.toLowerCase()) {
      case "confirmed":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400";

      case "active":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400";

      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400";

      default:
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400";
    }
  };

  const getSeverityStyles = (severityString: string) => {
    switch (severityString?.toLowerCase()) {
      case "severe":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400";

      case "moderate":
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400";

      case "mild":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formattedDate = allergy.effectiveAt
    ? new Date(allergy.effectiveAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div
      className={cn(
        "group rounded-xl border p-4 transition-all duration-300 hover:shadow",
      )}
    >
      {/* Header */}
      <div className="min-w-0">
        <h3 className="font-semibold text-base text-foreground">
          {allergy.allergy_name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {allergy.attributes.allergy_group_name ||
            allergy.attributes.allergy_type}
        </p>
      </div>

      {/* Status & Severity */}
      <div className="mt-3 flex flex-wrap gap-2">
        {status && (
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium",
              getStatusStyles(status),
            )}
          >
            Status : {status}
          </Badge>
        )}

        {severity && (
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-medium",
              getSeverityStyles(severity),
            )}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            Severity : {severity}
          </Badge>
        )}
      </div>

      {/* Reaction */}
      {allergy.attributes.reaction_description && (
        <div className="mt-3 rounded-xl bg-muted/50 p-3">
          <div className="mb-1 flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Reaction Description
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground">
            {allergy.attributes.reaction_description}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>
            {allergy.attributes.reaction_count || 0} reaction
            {(allergy.attributes.reaction_count || 0) > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Since {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default AllergyCard;
