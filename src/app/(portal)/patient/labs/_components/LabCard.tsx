import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ILab } from "@/api-services/patient/types";
import ViewLabChartDetails, { LabChartDialog } from "./ViewLabChartDetails";

const LabCard = ({ lab }: { lab: ILab }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-sm">
      {/* Left Section - Lab Info */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold text-foreground">
              {lab.observation_label}
            </h2>

            <Badge
              variant="outline"
              className={
                lab.attributes.is_active
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-50 text-slate-700 border-slate-200"
              }
            >
              {lab.attributes.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {lab.attributes.observation_value}{" "}
            {lab.attributes.observation_units}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(lab.effectiveAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Badge>

            {lab.attributes.review_with_patient && (
              <Badge variant="secondary">Reviewed</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Right Section - View Details Button */}
      <div className="flex shrink-0 items-center">
        <LabChartDialog lab={lab} />
        {/* <ViewDetails labId={lab.id} /> */}
      </div>
    </div>
  );
};

export default LabCard;
