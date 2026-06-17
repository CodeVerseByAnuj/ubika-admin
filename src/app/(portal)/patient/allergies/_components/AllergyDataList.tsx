import { IAllergies } from "@/api-services/patient/types";
import AllergyCard from "./AllergyCard";

type AllergyDataListProps = {
  allergyList: IAllergies[];
};

const AllergyDataList = ({ allergyList }: AllergyDataListProps) => {
  return (
    <>
      {allergyList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allergyList.map((allergy) => (
            <AllergyCard
              key={allergy.id + crypto.randomUUID()}
              allergy={allergy}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No Allergies Found
        </div>
      )}
    </>
  );
};

export default AllergyDataList;
