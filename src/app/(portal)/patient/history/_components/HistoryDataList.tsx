import { IHistory } from "@/api-services/patient/types";
import HistoryCard from "./HistoryCard";

type HistoryDataListProps = {
  historyList: IHistory[];
};

const HistoryDataList = ({ historyList }: HistoryDataListProps) => {
  return (
    <>
      {historyList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {historyList.map((history) => (
            <HistoryCard
              key={history.id + crypto.randomUUID()}
              history={history}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No History Found
        </div>
      )}
    </>
  );
};

export default HistoryDataList;
