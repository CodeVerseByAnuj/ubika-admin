import { FileText, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ILetter } from "@/api-services/patient/types";
import { cn } from "@/lib/utils";
import ViewDetails from "./ViewDetails";

const LetterCard = ({ letter }: { letter: ILetter }) => {
  const letterStatus = letter.attributes.letter_status;
  const isRead = letter.attributes.is_letter_read;

  const getStatusStyles = (statusString: string) => {
    switch (statusString.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const createdDate = new Date(letter?.effectiveAt)?.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const reviewedDate = letter?.attributes?.reviewed_ts
    ? new Date(letter?.attributes?.reviewed_ts)?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-sm">
      {/* Header */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-base font-medium line-clamp-2">
            {letter?.title}
          </h3>

          <Badge
            variant="outline"
            className={cn(
              "rounded-full whitespace-nowrap",
              getStatusStyles(letterStatus),
            )}
          >
            {letterStatus}
          </Badge>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge
            variant={isRead ? "secondary" : "destructive"}
            className="rounded-full"
          >
            {isRead ? "Read" : "Unread"}
          </Badge>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mt-4 rounded-lg bg-muted/40 p-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {letter?.content}
        </p>
      </div>

      {/* Dates */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Created: {createdDate}</span>
        </div>

        {reviewedDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Reviewed: {reviewedDate}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-xs text-muted-foreground">
          {letter?.attributes?.days_since_created} days ago
        </span>

        <ViewDetails letterId={letter?.id} />
      </div>
    </div>
  );
};

export default LetterCard;
