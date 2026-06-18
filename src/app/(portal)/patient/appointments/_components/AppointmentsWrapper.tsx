"use client";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IAppointmentsResponse } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AppointmentDataList from "./AppointmentDataList";
import AppointmentDataListSkeleton from "./AppointmentDataListSkeleton";

const AppointmentsWrapper = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
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
    router.replace(`${pathName}?${params.toString()}`, { scroll: true });
  }, [page, status, router, pathName]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAppointments", page, status],
    queryFn: () => {
      const params = new URLSearchParams();
      Object.entries({
        page,
        status,
        sort: "desc",
      }).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
      return patientApiServices.getAppointments<IAppointmentsResponse>(
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
    .filter(
      (item, index, self) =>
        self.findIndex(
          (a) => a.attributes.appointment_uuid === item.attributes.appointment_uuid,
        ) === index,
    )
    .sort(
      (a, b) =>
        new Date(b.appointment_start_time).getTime() -
        new Date(a.appointment_start_time).getTime(),
    );
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-serif">
            Appointments
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all upcoming appointments.
          </p>
        </div>

        <Select value={status} onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!isLoading ? (
        <AppointmentDataList appointments={dataList} />
      ) : (
        <AppointmentDataListSkeleton />
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

export default AppointmentsWrapper;
