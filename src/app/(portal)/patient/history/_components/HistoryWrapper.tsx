"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IHistoryResposne } from "@/api-services/patient/types";
import HistoryDataList from "./HistoryDataList";
import HistoryDataListSkeleton from "./HistoryDataListSkeleton";
import CustomPagination from "@/components/common/CustomPagination";

const HistoryWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
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
    router.replace(`${pathName}?${params.toString()}`, { scroll: true });
  }, [page, router, pathName]);

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

  const dataList = data?.data || [];
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient History</h1>

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
