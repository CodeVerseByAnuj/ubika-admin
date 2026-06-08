"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import {
  ISummariesResponse,
  ISummaryType,
} from "@/api-services/patient-wearables/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ActivityChart from "./ActivityChart";

const Main = () => {
  const [summaryType, setSummaryType] = useState<ISummaryType>("activity");
  const [date, setDate] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSummaries", summaryType, date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<ISummariesResponse>(
        summaryType,
        date,
      ),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="border p-2 rounded-lg flex justify-between items-center">
        <h1>Summary</h1>
      </div>
      <ActivityChart activity={data?.data || []} />
    </div>
  );
};

export default Main;
