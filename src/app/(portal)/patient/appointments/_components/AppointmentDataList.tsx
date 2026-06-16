import { IAppointment } from "@/api-services/patient/types";
import AppointmentCard from "./AppointmentCard";

type AppointmentDataListProps = {
  appointments: IAppointment[];
};

const AppointmentDataList = ({ appointments }: AppointmentDataListProps) => {
  return (
    <>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id + crypto.randomUUID()}
              appointment={appointment}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No Appointments Found
        </div>
      )}
    </>
  );
};

export default AppointmentDataList;
