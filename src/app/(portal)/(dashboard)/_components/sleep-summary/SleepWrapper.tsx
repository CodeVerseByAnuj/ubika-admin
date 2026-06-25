"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import {
  ISleepList,
  ISummariesResponse,
} from "@/api-services/patient-wearables/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SleepChart from "./SleepChart";
import ShowError from "../ShowError";
import LoadingSkeleton from "../LoadingSkeleton";

const SleepWrapper = () => {
  const [date, setDate] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  });

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["getSleepSummaries", date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<
        ISummariesResponse<ISleepList[]>
      >("sleep", date),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <ShowError
        title="Failed to Load Sleep Data"
        message={
          error instanceof Error
            ? error.message
            : "Unable to fetch sleep summaries."
        }
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <SleepChart
      sleep={data?.data || []}
      date={date}
      setDate={setDate}
      loading={isLoading || isFetching}
    />
  );
};

export default SleepWrapper;
