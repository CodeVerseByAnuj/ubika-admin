/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClipboardList, Calendar, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HistoryCard = ({ history }: { history: any }) => {
  const historyType = history.attributes.history_type;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "REGULAR":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40";

      case "FOLLOW_UP":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/40";

      case "SPECIALIST":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="group rounded-xl border bg-background p-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all duration-300">
      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon */}
        <div className="h-11 w-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <ClipboardList className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-foreground truncate">
              {history.history_description}
            </h2>

            <Badge
              variant="outline"
              className={`text-[10px] font-semibold rounded-full uppercase ${getTypeStyles(
                historyType,
              )}`}
            >
              {historyType.replace("_", " ")}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground truncate">
            {history.attributes.details || "No additional details"}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              <Calendar className="h-3 w-3 mr-1" />

              {new Date(history.effectiveAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Badge>

            {history.attributes.treatment && (
              <Badge
                variant="outline"
                className="rounded-md px-2 py-1 text-xs font-medium"
              >
                {history.attributes.treatment}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="shrink-0">
        <Button variant="ghost" size="icon" className="rounded-lg">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HistoryCard;
