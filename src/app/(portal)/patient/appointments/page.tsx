import { Suspense } from "react";
import AppointmentsWrapper from "./_components/AppointmentsWrapper";

const PatientAppointmentsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentsWrapper />;
    </Suspense>
  );
};

export default PatientAppointmentsPage;
