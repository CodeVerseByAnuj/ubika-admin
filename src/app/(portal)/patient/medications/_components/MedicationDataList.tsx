import { IMedication } from "@/api-services/patient/types";
import MedicationCard from "./MedicationCard";

type MedicationDataListProps = {
  medications: IMedication[];
};

const MedicationDataList = ({ medications }: MedicationDataListProps) => {
  return (
    <>
      {medications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id + crypto.randomUUID()}
              medication={medication}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No medications Found
        </div>
      )}
    </>
  );
};

export default MedicationDataList;
