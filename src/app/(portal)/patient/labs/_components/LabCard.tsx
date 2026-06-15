/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlaskConical, Calendar, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LabCard = ({ lab }: { lab: any }) => {
  const status = lab.attributes.status;

  const getStatusStyles = (statusString: string) => {
    switch (statusString) {
      case "Normal":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40";

      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40";
    }
  };

  return (
    <div className="group rounded-xl border bg-background p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon */}
        <div className="h-11 w-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <FlaskConical className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-foreground truncate">
              {lab.observation_label}
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

          <p className="text-sm text-muted-foreground">
            {lab.attributes.observation_value}{" "}
            {lab.attributes.observation_units}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              <Calendar className="h-3 w-3 mr-1" />

              {new Date(lab.effectiveAt).toLocaleDateString("en-US", {
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

export default LabCard;
