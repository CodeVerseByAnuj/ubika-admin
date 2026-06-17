/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { patientApiServices } from "@/api-services/patient/api";
import { IHistoryResposne } from "@/api-services/patient/types";

const LettesWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [page] = useState(() => parseInt(searchParams.get("page") || "1", 10));

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

  const { data, isError, error } = useQuery({
    queryKey: ["getLatters", page],
    queryFn: () => patientApiServices.getLatters<any>(page),
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

  console.log(dataList, paginationMeta);
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-serif">
          Patient Letters
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review and manage all medical letters and notices.
        </p>
      </div>
    </div>
  );
};

export default LettesWrapper;
