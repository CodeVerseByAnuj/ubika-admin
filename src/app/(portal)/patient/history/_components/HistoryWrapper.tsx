"use client";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IHistoryResposne } from "@/api-services/patient/types";
import HistoryDataList from "./HistoryDataList";
import HistoryDataListSkeleton from "./HistoryDataListSkeleton";
import CustomPagination from "@/components/common/CustomPagination";

const HistoryWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(() =>
    parseInt(searchParams.get("page") || "1", 10),
  );

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries({
      page,
    }).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [page, navigate, location.pathname]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getHistory", page],
    queryFn: () => patientApiServices.getHistory<IHistoryResposne>(page),
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
        self.findIndex(
          (h) =>
            h.history_description === item.history_description &&
            h.attributes.history_type === item.attributes.history_type,
        ) === index,
    );
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-serif">
          History
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review complete patient medical and treatment history.
        </p>
      </div>

      {!isLoading ? (
        <HistoryDataList historyList={dataList} />
      ) : (
        <HistoryDataListSkeleton />
      )}

      <>
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
      </>
    </div>
  );
};

export default HistoryWrapper;
