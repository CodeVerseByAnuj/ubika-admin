import { ICondition } from "@/api-services/patient/types";
import ConditionCard from "./ConditionCard";

type ConditionDataListProps = {
  conditionList: ICondition[];
};

const ConditionDataList = ({ conditionList }: ConditionDataListProps) => {
  return (
    <>
      {conditionList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {conditionList.map((condition) => (
            <ConditionCard
              key={condition.id + crypto.randomUUID()}
              condition={condition}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No Conditions Found
        </div>
      )}
    </>
  );
};

export default ConditionDataList;
