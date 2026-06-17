import { IHistory } from "@/api-services/patient/types";
import LetterCard from "./LetterCard";

type LetterDataListProps = {
  letterList: IHistory[];
};

const LetterDataList = ({ letterList }: LetterDataListProps) => {
  return (
    <>
      {letterList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {letterList.map((letter) => (
            <LetterCard key={letter.id + crypto.randomUUID()} letter={letter} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No Letters Found
        </div>
      )}
    </>
  );
};

export default LetterDataList;
