import { FlaskConical } from "lucide-react";
import { ILab } from "@/api-services/patient/types";
import { LabChartDialog } from "./ViewLabChartDetails";

const LabCard = ({ lab }: { lab: ILab }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-3 py-3 transition-colors hover:bg-accent/50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
        <FlaskConical className="h-4 w-4 text-violet-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {lab.observation_label}
        </p>
        <p className="text-xs text-muted-foreground">
          {lab.attributes.observation_value}
          {lab.attributes.observation_units
            ? ` ${lab.attributes.observation_units}`
            : ""}
          {lab.attributes.observation_range
            ? ` · Ref: ${lab.attributes.observation_range}`
            : ""}
          {lab.attributes.observation_flag ? (
            <span className="ml-1 font-semibold text-destructive">
              {lab.attributes.observation_flag}
            </span>
          ) : null}
        </p>
      </div>

      <div className="shrink-0">
        <LabChartDialog lab={lab} />
      </div>
    </div>
  );
};

export default LabCard;
