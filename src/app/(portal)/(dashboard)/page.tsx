import ActivityWrapper from "./_components/activity-summary/ActivityWrapper";
import BodyWrapper from "./_components/body-summary/BodyWrapper";
import SleepWrapper from "./_components/sleep-summary/SleepWrapper";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <BodyWrapper />
      <ActivityWrapper />
      <SleepWrapper />
    </div>
  );
};

export default DashboardPage;
