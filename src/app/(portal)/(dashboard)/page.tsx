import ActivityWrapper from "./_components/activity-summary/ActivityWrapper";
import BodyWrapper from "./_components/body-summary/BodyWrapper";
import DataWrapper from "./_components/data-summary/DataWrapper";
import SleepWrapper from "./_components/sleep-summary/SleepWrapper";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <DataWrapper />
      <BodyWrapper />
      <ActivityWrapper />
      <SleepWrapper />
    </div>
  );
};

export default DashboardPage;
