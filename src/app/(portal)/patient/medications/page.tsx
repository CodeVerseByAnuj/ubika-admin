import { Suspense } from "react";
import MedicationsWrapper from "./_components/MedicationsWrapper";

const PatientMedicationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MedicationsWrapper />
    </Suspense>
  );
};

export default PatientMedicationsPage;
