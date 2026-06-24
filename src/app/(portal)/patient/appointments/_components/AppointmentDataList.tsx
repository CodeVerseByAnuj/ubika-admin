import { IAppointment } from "@/api-services/patient/types";
import AppointmentCard from "./AppointmentCard";

type AppointmentDataListProps = {
  appointments: IAppointment[];
  activeStatus: string;
};

const SectionHeader = ({ label }: { label: string }) => (
  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 pt-2 pb-1">
    {label}
  </p>
);

const EmptyState = () => (
  <div className="py-20 text-center text-muted-foreground">
    No Appointments Found
  </div>
);

const AppointmentDataList = ({
  appointments,
  activeStatus,
}: AppointmentDataListProps) => {
  const now = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(a.appointment_start_time) >= now,
  );
  const past = appointments.filter(
    (a) => new Date(a.appointment_start_time) < now,
  );

  if (appointments.length === 0) return <EmptyState />;

  if (activeStatus === "upcoming") {
    return (
      <div>
        <SectionHeader label="Upcoming" />
        <div className="divide-y divide-border rounded-xl border bg-card">
          {upcoming.map((a) => (
            <AppointmentCard key={a.attributes.appointment_uuid ?? a.id} appointment={a} />
          ))}
        </div>
      </div>
    );
  }

  if (activeStatus === "past") {
    return (
      <div>
        <SectionHeader label="Past" />
        <div className="divide-y divide-border rounded-xl border bg-card">
          {past.map((a) => (
            <AppointmentCard key={a.attributes.appointment_uuid ?? a.id} appointment={a} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {upcoming.length > 0 && (
        <div>
          <SectionHeader label="Upcoming" />
          <div className="divide-y divide-border rounded-xl border bg-card">
            {upcoming.map((a) => (
              <AppointmentCard key={a.attributes.appointment_uuid ?? a.id} appointment={a} />
            ))}
          </div>
        </div>
      )}
      {past.length > 0 && (
        <div>
          <SectionHeader label="Past" />
          <div className="divide-y divide-border rounded-xl border bg-card">
            {past.map((a) => (
              <AppointmentCard key={a.attributes.appointment_uuid ?? a.id} appointment={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentDataList;
