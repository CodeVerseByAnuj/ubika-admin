"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IConditionsResponse } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import ConditionDataList from "./ConditionDataList";
import ConditionDataListSkeleton from "./ConditionDataListSkeleton";

const ConditionWrapper = () => {
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

  const { data, isLoading } = useQuery({
    queryKey: ["getConditions", page],
    queryFn: () => patientApiServices.getConditions<IConditionsResponse>(page),
    placeholderData: keepPreviousData,
  });

  const dataList = data?.data || [];
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Patient Conditions
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Track and review all diagnosed medical conditions.
        </p>
      </div>

      {!isLoading ? (
        <ConditionDataList conditionList={dataList} />
      ) : (
        <ConditionDataListSkeleton />
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

export default ConditionWrapper;
