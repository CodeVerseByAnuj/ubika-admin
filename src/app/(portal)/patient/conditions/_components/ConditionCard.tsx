import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ICondition } from "@/api-services/patient/types";
import { cn } from "@/lib/utils";

const ConditionCard = ({ condition }: { condition: ICondition }) => {
  const status = condition.attributes.condition_status_name || "Unknown";

  const getStatusStyles = (statusString: string) => {
    switch (statusString.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400";

      case "resolved":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400";

      case "critical":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400";
    }
  };

  const onsetDate = condition.attributes.condition_onset_ts
    ? new Date(condition.attributes.condition_onset_ts).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      )
    : null;

  const recoveryDate = condition.attributes.condition_recovery_ts
    ? new Date(condition.attributes.condition_recovery_ts).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      )
    : null;

  return (
    <div className="group rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-sm">
      {/* Header */}

      <div className="min-w-0">
        <h3 className="font-semibold text-base">
          {condition?.condition_description}
        </h3>

        <p className="text-sm text-muted-foreground">
          {condition?.attributes?.finding_type || "Medical Condition"}
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 rounded-xl bg-muted/40 p-3 space-y-2">
        <div className="text-sm">
          <span className="font-medium">Status:</span>{" "}
          <Badge
            variant="outline"
            className={cn(
              "rounded-full text-xs font-medium",
              getStatusStyles(status),
            )}
          >
            {status}
          </Badge>
        </div>

        <div className="text-sm">
          <span className="font-medium">Code:</span>{" "}
          <span className="text-muted-foreground">
            {condition?.attributes?.condition_code}
          </span>
        </div>

        {condition?.attributes?.days_since_diagnosed > 0 && (
          <div className="text-sm">
            <span className="font-medium">Diagnosed:</span>{" "}
            <span className="text-muted-foreground">
              {condition?.attributes?.days_since_diagnosed} days ago
            </span>
          </div>
        )}

        {onsetDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Onset: {onsetDate}</span>
          </div>
        )}

        {recoveryDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Recovery: {recoveryDate}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* Footer */}
      <div className="mt-4 border-t pt-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">
            {condition?.attributes?.is_active_condition
              ? "Condition Active"
              : "Condition Inactive"}
          </Badge>

          {condition?.attributes?.is_resolved && (
            <Badge variant="outline">Resolved</Badge>
          )}

          {condition?.attributes?.is_negative && (
            <Badge variant="outline">Negative Finding</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConditionCard;
