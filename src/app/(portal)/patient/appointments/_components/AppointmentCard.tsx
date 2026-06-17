import {
  CalendarDays,
  Clock3,
  MapPin,
  CheckCircle2,
  XCircle,
  User,
  FileText,
} from "lucide-react";
import { IAppointment } from "@/api-services/patient/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ViewDetails from "./ViewDetails";

const AppointmentCard = ({ appointment }: { appointment: IAppointment }) => {
  const { appointment_start_time, appointment_end_time, type, attributes } =
    appointment;

  const getStatus = () => {
    if (attributes.is_deleted) {
      return {
        label: "Deleted",
        icon: XCircle,
        className: "bg-stone-100 text-stone-600 border-stone-200",
      };
    }
    if (attributes.is_cancelled) {
      return {
        label: "Cancelled",
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200",
      };
    }
    if (attributes.has_arrived) {
      return {
        label: "Arrived",
        icon: CheckCircle2,
        className: "bg-green-50 text-green-700 border-green-200",
      };
    }
    if (attributes.is_confirmed) {
      return {
        label: "Confirmed",
        icon: CheckCircle2,
        className: "bg-blue-50 text-blue-700 border-blue-200",
      };
    }
    return {
      label: "Scheduled",
      icon: CalendarDays,
      className: "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  const startDate = new Date(appointment_start_time);
  const endDate = new Date(appointment_end_time);

  const date = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const startTime = startDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const endTime = endDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const isUpcoming = startDate > new Date();

  return (
    <div
      className={cn(
        "group rounded-xl border p-5 transition-all duration-300 hover:shadow bg-stone-50",
        isUpcoming && !attributes.is_cancelled && "border-l-4 border-l-primary",
        (attributes.is_cancelled || attributes.is_deleted) &&
        "opacity-70 bg-muted/20",
      )}
    >
      {/* Header: Title and Status */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base capitalize">
            {type?.toLowerCase().replace(/_/g, " ") || "General Visit"}
          </h3>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            status.className,
          )}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </Badge>
      </div>

      {/* Date & Time Highlight */}
      <div className="mt-3 rounded-xl bg-muted/50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock3 className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">{date}</p>
            <p className="text-xs text-muted-foreground">
              {startTime} - {endTime}
            </p>
          </div>
        </div>
        {attributes.is_bill_only && (
          <Badge
            variant="secondary"
            className="text-[10px] uppercase tracking-wider"
          >
            Bill Only
          </Badge>
        )}
      </div>

      {/* Core Details: Provider, Reason, Location */}
      <div className="mt-3 space-y-2.5 border-b pb-4">
        {/* Provider Detail */}
        <div className="flex items-center gap-2.5 text-sm">
          <User className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Doctor/Provider:</span>
          <span className="font-medium text-foreground">
            Dr. (ID: {attributes.provider_id || "N/A"})
          </span>
        </div>

        {/* Reason Detail */}
        {attributes.reason_id && (
          <div className="flex items-center gap-2.5 text-sm">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">Reason Code:</span>
            <span className="font-medium text-foreground">
              #{attributes.reason_id}
            </span>
          </div>
        )}

        {/* Location Detail */}
        <div className="flex items-center gap-2.5 text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">Location:</span>
          <span className="font-medium text-foreground truncate">
            {attributes.service_location || "Not Specified"}
          </span>
        </div>
      </div>

      {/* Footer & Action Button */}
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="text-[11px] text-muted-foreground">
          Synced:{" "}
          {new Date(appointment.provenance.lastSyncedAt).toLocaleDateString()}
        </div>
        <ViewDetails appointmentId={appointment.id} />
      </div>
    </div>
  );
};

export default AppointmentCard;
