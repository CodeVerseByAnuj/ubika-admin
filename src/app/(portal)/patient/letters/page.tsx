import { Suspense } from "react";
import LettersWrapper from "./_components/LettersWrapper";

const PatientLettersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LettersWrapper />
    </Suspense>
  );
};

export default PatientLettersPage;
