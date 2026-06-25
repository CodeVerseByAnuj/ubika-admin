"use client";

import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IMedicationsResposne } from "@/api-services/patient/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import MedicationDataList from "./MedicationDataList";
import MedicationDataListSkeleton from "./MedicationDataListSkeleton";
import CustomPagination from "@/components/common/CustomPagination";

const MedicationsWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(() =>
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [status, setStatus] = useState(
    () => searchParams.get("status") || "all",
  );

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries({
      page,
      status,
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [page, status, navigate, location.pathname]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getMedications", page, status],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries({
        page,
        status,
      }).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      return patientApiServices.getMedications<IMedicationsResposne>(
        params.toString(),
      );
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    return (
      <div className="text-sm">
        <span className="font-medium text-destructive">
          Failed to load results {" : "}
        </span>
        <span className="text-muted-foreground">
          {error.message || "Please try again later."}
        </span>
      </div>
    );
  }

  const dataList = (data?.data || [])
    .sort(
      (a, b) =>
        new Date(b.effectiveAt).getTime() - new Date(a.effectiveAt).getTime(),
    )
    .filter(
      (item, index, self) =>
        self.findIndex((m) => m.medication_name === item.medication_name) ===
        index,
    );
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-serif">
            Medications
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Track and manage all prescribed medications.
          </p>
        </div>

        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!isLoading ? (
        <MedicationDataList medications={dataList} />
      ) : (
        <MedicationDataListSkeleton />
      )}

      {!isLoading && paginationMeta && (
        <CustomPagination
          pagination={{
            page: page,
            limit: paginationMeta.per_page,
            total: paginationMeta.total,
            totalPages: paginationMeta.last_page,
          }}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  );
};

export default MedicationsWrapper;
