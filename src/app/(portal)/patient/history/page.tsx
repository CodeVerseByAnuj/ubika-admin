import { Suspense } from "react";
import HistoryWrapper from "./_components/HistoryWrapper";

const PatientHistoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryWrapper />;
    </Suspense>
  );
};

export default PatientHistoryPage;
