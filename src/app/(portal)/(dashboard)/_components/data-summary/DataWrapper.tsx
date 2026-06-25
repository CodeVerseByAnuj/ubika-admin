"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import { IDataSummary } from "@/api-services/patient-wearables/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataSummaryChart from "./DataSummaryChart";
import LoadingSkeleton from "../LoadingSkeleton";
import ShowError from "../ShowError";

const DataWrapper = () => {
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
    queryKey: ["getDataSummaries", date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<IDataSummary>("data", date),
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
    <DataSummaryChart
      data={data || null}
      date={date}
      setDate={setDate}
      loading={isLoading || isFetching}
    />
  );
};

export default DataWrapper;
