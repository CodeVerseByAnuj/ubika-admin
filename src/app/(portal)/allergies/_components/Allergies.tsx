"use client";

import { patientApiServices } from "@/api-services/patient/api";
import { IAllergiesResponse } from "@/api-services/patient/types";
import CustomPagination from "@/components/common/CustomPagination";
import { DataTable } from "@/components/common/DataTable";
import DataTableSkeleton from "@/components/common/DataTableSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getColumns } from "../columns";

const Allergies = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["patientApiServices", page],
    queryFn: () => patientApiServices.getAllergies<IAllergiesResponse>(page),
  });

  const dataList = data?.data || [];
  const paginationMeta = data?.meta || null;

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-3">Allergies</h1>
      <div className="space-y-3">
        {!isLoading ? (
          <DataTable
            data={dataList}
            columns={getColumns({
              page: page,
              limit: paginationMeta?.per_page || 50,
            })}
          />
        ) : (
          <DataTableSkeleton
            rowCount={50}
            columnCount={
              getColumns({
                page: page,
                limit: 50,
              }).length
            }
          />
        )}
        {paginationMeta && (
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
    </div>
  );
};

export default Allergies;
