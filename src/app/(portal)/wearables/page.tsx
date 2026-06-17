import ActivityWrapper from "../(dashboard)/_components/activity-summary/ActivityWrapper";
import BodyWrapper from "../(dashboard)/_components/body-summary/BodyWrapper";
import DataWrapper from "../(dashboard)/_components/data-summary/DataWrapper";
import SleepWrapper from "../(dashboard)/_components/sleep-summary/SleepWrapper";

const WearablesPage = () => {
  return (
    <div className="space-y-4">
      <DataWrapper />
      <BodyWrapper />
      <ActivityWrapper />
      <SleepWrapper />
    </div>
  );
};

export default WearablesPage;
