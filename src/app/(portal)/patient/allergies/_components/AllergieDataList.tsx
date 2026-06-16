import { IAllergies } from "@/api-services/patient/types";
import AllergieCard from "./AllergieCard";

type AllergieDataListProps = {
  allergiesList: IAllergies[];
};

const AllergieDataList = ({ allergiesList }: AllergieDataListProps) => {
  return (
    <>
      {allergiesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allergiesList.map((allergy) => (
            <AllergieCard
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

export default AllergieDataList;
