import ActivityWrapper from "./_components/activity-summary/ActivityWrapper";
import SleepWrapper from "./_components/sleep-summary/SleepWrapper";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <ActivityWrapper />
      <SleepWrapper />
    </div>
  );
};

export default DashboardPage;
