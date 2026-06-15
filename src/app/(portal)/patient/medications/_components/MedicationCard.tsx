/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pill, ChevronRight, Calendar, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MedicationCard = ({ medication }: { medication: any }) => {
  const status = medication.attributes.prescription_status;

  const getStatusStyles = (statusString: string) => {
    switch (statusString) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/40";

      default:
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40";
    }
  };

  return (
    <div className="group rounded-xl border bg-brand-soft bg-background p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon */}
        <div className="h-11 w-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <Pill className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-foreground capitalize truncate">
              {medication.medication_name}
            </h2>

            <Badge
              variant="outline"
              className={`text-[10px] font-semibold rounded-full uppercase ${getStatusStyles(
                status,
              )}`}
            >
              {status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground truncate">
            {medication.attributes.medication_display_text}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              <Calendar className="h-3 w-3 mr-1" />

              {new Date(medication.effectiveAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="shrink-0">
        <Button variant="ghost" size="icon" className="rounded-lg">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MedicationCard;
