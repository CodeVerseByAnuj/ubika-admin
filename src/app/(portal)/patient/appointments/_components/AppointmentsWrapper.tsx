"use client";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IAppointmentsResponse } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AppointmentDataList from "./AppointmentDataList";
import AppointmentDataListSkeleton from "./AppointmentDataListSkeleton";

const AppointmentsWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(() =>
    parseInt(searchParams.get("page") || "1", 10),
  );
  const [status, setStatus] = useState(
    () => searchParams.get("status") || "upcoming",
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

  const tabs = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Past", value: "past" },
    { label: "All", value: "all" },
  ];

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-serif">
          Appointments
        </h1>
      </div>

      <section className="flex justify-end">
        <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setStatus(tab.value);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${status === tab.value
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {!isLoading ? (
        <AppointmentDataList appointments={dataList} activeStatus={status} />
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
