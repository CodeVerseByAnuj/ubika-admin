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
  // Initial values from URL
  const initialFilters = useMemo(
    () => ({
      observation_label: searchParams.get("observation_label") || "",
      type: searchParams.get("type") || "",
      effectiveAt: searchParams.get("effectiveAt") || "",
    }),
    [searchParams],
  );

  const initialPage = Number(searchParams.get("page") || 1);
  const [page, setPage] = useState(initialPage);

  const [filters, setFilters] = useState<{
    observation_label?: string;
    type?: string;
    effectiveAt?: string;
  }>(initialFilters);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));

    if (filters.observation_label) {
      params.set("observation_label", filters.observation_label);
    }

    if (filters.type) {
      params.set("type", filters.type);
    }

    if (filters.effectiveAt) {
      params.set("effectiveAt", filters.effectiveAt);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  }, [page, filters, pathname, router]);

  // Query string for API
  const apiQueryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (filters.observation_label) {
      params.set("observation_label", filters.observation_label);
    }
    if (filters.type) {
      params.set("type", filters.type);
    }
    if (filters.effectiveAt) {
      params.set("effectiveAt", filters.effectiveAt);
    }
    return params.toString();
  }, [page, filters]);

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

  const handleFiltersChange = useCallback(
    (newFilters: {
      observation_label?: string;
      type?: string;
      effectiveAt?: string;
    }) => {
      setPage(1);
      setFilters(newFilters);
    },
    [],
  );

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-serif">
          Lab Results
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor and review recent laboratory reports.
        </p>
      </div>

      <LabFilters
        initialFilters={initialFilters}
        onFiltersChange={handleFiltersChange}
      />

      {isLoading ? <LabListSkeleton /> : <LabDataList labList={dataList} />}

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
