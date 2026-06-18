"use client";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IAllergiesResponse } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import AllergyDataListSkeleton from "./AllergyDataListSkeleton";
import AllergyDataList from "./AllergyDataList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const AllergiesWrapper = () => {
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
    queryKey: ["getAllergies", page],
    queryFn: () => patientApiServices.getAllergies<IAllergiesResponse>(page),
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
  const uniqueDataList = Array.from(
    new Map(dataList.map((item) => [item.id, item])).values(),
  );
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-serif">
          Allergies
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review patient allergy records and reactions.
        </p>
      </div>

      {!isLoading ? (
        <AllergyDataList allergyList={uniqueDataList} />
      ) : (
        <AllergyDataListSkeleton />
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

export default AllergiesWrapper;
