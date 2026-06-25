"use client";
import { patientApiServices } from "@/api-services/patient/api";
import {
  IAppointment,
  IAppointmentsResponse,
} from "@/api-services/patient/types";
import { ItemRow } from "@/components/custom-ui/item-row";
import ItemRowSkeleton from "@/components/custom-ui/item-row-skeleton";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";

const UpcomingAppointments = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["getUpcomingAppointments"],
    queryFn: () =>
      patientApiServices.getAppointments<IAppointmentsResponse>(
        `page=1&status=upcoming&sort=desc`,
      ),
  });

  const appointments = (data?.data || []).slice().sort(
    (a, b) =>
      new Date(b.appointment_start_time).getTime() -
      new Date(a.appointment_start_time).getTime(),
  );

  const formatAppointmentInfo = (appointment: IAppointment) => {
    const start = new Date(appointment.appointment_start_time);
    const end = new Date(appointment.appointment_end_time);
    const dateStr = start.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const timeStr = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const endTimeStr = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${dateStr} · ${timeStr} - ${endTimeStr}`;
  };

  const getTrail = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffDays = Math.ceil(
      (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `${diffDays}d`;
    return start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="mt-4">
      <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Upcoming
      </h2>

      <div className="space-y-2">
        {isPending ? (
          <>
            <ItemRowSkeleton />
            <ItemRowSkeleton />
            <ItemRowSkeleton />
          </>
        ) : isError ? (
          // Error state
          <p className="text-sm text-red-500">Failed to load appointments</p>
        ) : appointments.length === 0 ? (
          // Empty state
          <p className="text-sm text-muted-foreground border p-4 rounded-lg bg-white">
            No upcoming appointments
          </p>
        ) : (
          // Data list
          appointments.map((appointment) => (
            <ItemRow
              key={appointment.id}
              icon={CalendarDays}
              title={`Appointment`}
              subtitle={formatAppointmentInfo(appointment)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default UpcomingAppointments;
