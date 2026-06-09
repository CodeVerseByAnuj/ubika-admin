"use client";
import { patientWearablesApiServices } from "@/api-services/patient-wearables/api";
import {
  IBody,
  ISummariesResponse,
} from "@/api-services/patient-wearables/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BodyChart from "./BodyChart";

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

  const { data } = useQuery({
    queryKey: ["getBodySummaries", date],
    queryFn: () =>
      patientWearablesApiServices.getSummaries<IBody>("body", date),
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return <BodyChart body={data || null} date={date} setDate={setDate} />;
};

export default BodyWrapper;
