/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, MoreVertical } from "lucide-react";

const AppointmentCard = ({ appointment }: { appointment: any }) => {
  return (
    <div className="group rounded-xl border bg-white px-4 py-4 flex items-center justify-between gap-4 hover:shadow-sm transition-all duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon */}
        <div className="h-11 w-11 shrink-0 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <CalendarDays className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {appointment.doctor}
          </h2>

          <p className="text-sm text-muted-foreground">
            {appointment.specialization}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="rounded-md px-2 py-1 text-xs font-medium"
            >
              {appointment.date}
            </Badge>

            <Badge className="rounded-md bg-primary/10 text-primary hover:bg-primary/10 px-2 py-1 text-xs font-medium">
              {appointment.time}
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg text-muted-foreground"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
