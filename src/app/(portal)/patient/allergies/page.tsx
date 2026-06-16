import { Suspense } from "react";
import AllergiesWrapper from "./_components/AllergiesWrapper";

const PatientAllergiesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllergiesWrapper />;
    </Suspense>
  );
};

export default PatientAllergiesPage;
