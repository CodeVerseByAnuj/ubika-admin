import { Suspense } from "react";
import LabsWrapper from "./_components/LabsWrapper";

const PatientLabsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LabsWrapper />;
    </Suspense>
  );
};

export default PatientLabsPage;
