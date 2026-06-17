import { Suspense } from "react";
import LettesWrapper from "./_components/LettesWrapper";

const PatientLettersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LettesWrapper />
    </Suspense>
  );
};

export default PatientLettersPage;
