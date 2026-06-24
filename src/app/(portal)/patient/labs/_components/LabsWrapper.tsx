"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { ILabsResposne } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import LabDataList from "./LabDataList";
import LabListSkeleton from "./LabListSkeleton";
import LabFilters from "./LabFilters";

const LabsWrapper = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialLabel = searchParams.get("observation_label") || "";
  const initialPage = Number(searchParams.get("page") || 1);

  const [page, setPage] = useState(initialPage);
  const [observationLabel, setObservationLabel] = useState(initialLabel);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (observationLabel) params.set("observation_label", observationLabel);
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  }, [page, observationLabel, pathname, router]);

  const apiQueryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (observationLabel) params.set("observation_label", observationLabel);
    return params.toString();
  }, [page, observationLabel]);

  const handleFiltersChange = useCallback(
    (filters: { observation_label?: string }) => {
      setPage(1);
      setObservationLabel(filters.observation_label || "");
    },
    [],
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getLabs", apiQueryString],
    queryFn: () => patientApiServices.getLabs<ILabsResposne>(apiQueryString),
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
  const paginationMeta = data?.meta;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight">
          Lab Results
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor and review recent laboratory reports.
        </p>
      </div>

      <LabFilters
        initialFilters={{ observation_label: initialLabel }}
        onFiltersChange={handleFiltersChange}
      />

      {isLoading ? (
        <LabListSkeleton />
      ) : (
        <LabDataList labList={dataList} />
      )}

      {!isLoading && paginationMeta && (
        <CustomPagination
          pagination={{
            page,
            limit: paginationMeta.per_page,
            total: paginationMeta.total,
            totalPages: paginationMeta.last_page,
          }}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default LabsWrapper;
