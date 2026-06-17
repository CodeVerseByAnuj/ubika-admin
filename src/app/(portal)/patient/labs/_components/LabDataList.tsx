import { ILab } from "@/api-services/patient/types";
import LabCard from "./LabCard";

type LabDataListProps = {
  labList: ILab[];
};

const LabDataList = ({ labList }: LabDataListProps) => {
  return (
    <>
      {labList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labList.map((lab) => (
            <LabCard key={lab.id + crypto.randomUUID()} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No Labs Found
        </div>
      )}
    </>
  );
};

export default LabDataList;
