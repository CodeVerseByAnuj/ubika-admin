import { Suspense } from "react";
import ConditionWrapper from "./_components/ConditionWrapper";

const PatientConditionsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConditionWrapper />;
    </Suspense>
  );
};

export default PatientConditionsPage;
