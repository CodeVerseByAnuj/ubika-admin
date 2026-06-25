"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import { IBody } from "@/api-services/patient-wearables/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BodyChart from "./BodyChart";
import LoadingSkeleton from "../LoadingSkeleton";
import ShowError from "../ShowError";

const BodyWrapper = () => {
  const [date, setDate] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  });

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["getBodySummaries", date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<IBody>("body", date),
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
    <BodyChart
      body={data || null}
      date={date}
      setDate={setDate}
      loading={isLoading || isFetching}
    />
  );
};

export default BodyWrapper;
