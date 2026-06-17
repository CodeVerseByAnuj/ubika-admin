"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IHistoryResposne } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";

const LettesWrapper = () => {
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
    queryKey: ["getAllergies", page],
    queryFn: () => patientApiServices.getHistory<IHistoryResposne>(page),
    placeholderData: keepPreviousData,
  });

  const dataList = data?.data || [];
  const paginationMeta = data?.meta || null;
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Letters</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review and manage all medical letters and notices.
        </p>
      </div>
    </div>
  );
};

export default LettesWrapper;
