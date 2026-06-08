"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import {
  IActivityList,
  ISummariesResponse,
} from "@/api-services/patient-wearables/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ActivityChart from "./ActivityChart";

const ActivityWrapper = () => {
  const [date, setDate] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  });

  const { data } = useQuery({
    queryKey: ["getActivitySummaries", date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<
        ISummariesResponse<IActivityList>
      >("activity", date),
    placeholderData: keepPreviousData,
  });

  return (
    <ActivityChart activity={data?.data || []} date={date} setDate={setDate} />
  );
};

export default ActivityWrapper;
