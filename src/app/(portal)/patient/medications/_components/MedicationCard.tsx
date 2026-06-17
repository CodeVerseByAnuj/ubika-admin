import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IMedication } from "@/api-services/patient/types";
import ViewDetails from "./ViewDetails";

const MedicationCard = ({ medication }: { medication: IMedication }) => {
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
    <div className="group rounded-xl border bg-white p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* Content */}
        <div className="min-w-0 flex-1">
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

          <p className="mt-1 text-sm text-muted-foreground">
            {medication.attributes.dose_range_text}{" "}
            {medication.attributes.dose_unit}
            {" • "}
            {medication.attributes.interval_time}
            {" • "}
            {medication.attributes.route}
          </p>

          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
            {medication.attributes.instructions_display_text}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              {medication.attributes.type_of_use}
            </Badge>

            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              Duration: {medication.attributes.duration_amount}{" "}
              {medication.attributes.duration_unit}
            </Badge>

            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(medication.effectiveAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="shrink-0">
        <ViewDetails medicationId={medication.id} />
      </div>
    </div>
  );
};

export default MedicationCard;
