import { CalendarDays, ChevronRight, Stethoscope } from "lucide-react";
import { IAppointment } from "@/api-services/patient/types";
import { cn } from "@/lib/utils";
import ViewDetails from "./ViewDetails";

const AppointmentCard = ({ appointment }: { appointment: IAppointment }) => {
  const { appointment_start_time, appointment_end_time, type, attributes } =
    appointment;

  const startDate = new Date(appointment_start_time);
  const endDate = new Date(appointment_end_time);
  const isUpcoming = startDate >= new Date();

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

  const isCancelledOrDeleted = attributes.is_cancelled || attributes.is_deleted;
  const Icon = type?.toLowerCase().includes("lab") ? CalendarDays : Stethoscope;

  return (
    <ViewDetails appointmentId={appointment.id}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 cursor-pointer",
          isCancelledOrDeleted && "opacity-50",
          !isUpcoming && "opacity-60",
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            isUpcoming && !isCancelledOrDeleted
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{date}</p>
          <p className="text-xs text-muted-foreground">
            {startTime} – {endTime}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </ViewDetails>
  );
};

export default AppointmentCard;
