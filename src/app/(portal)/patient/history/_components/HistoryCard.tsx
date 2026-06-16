import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IHistory } from "@/api-services/patient/types";

const HistoryCard = ({ history }: { history: IHistory }) => {
  const recordedDate = new Date(history.effectiveAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="rounded-xl border bg-card p-4 transition-all hover:shadow-sm">
      {/* Header */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-base">
          {history.history_description}
        </h3>

        <p className="text-sm text-muted-foreground">
          {history.attributes.history_type}
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{history.attributes.location_name}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{recordedDate}</span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline">{history.attributes.finding_type}</Badge>

        {history.attributes.is_active && (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </Badge>
        )}

        {history.attributes.is_resolved && (
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
            Resolved
          </Badge>
        )}

        {history.attributes.is_negative && (
          <Badge variant="secondary">Negative Finding</Badge>
        )}
      </div>

      {(history.attributes.details || history.attributes.note) && (
        <div className="mt-4 rounded-lg bg-muted/40 p-3">
          <p className="text-sm text-muted-foreground">
            {history.attributes.details || history.attributes.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
