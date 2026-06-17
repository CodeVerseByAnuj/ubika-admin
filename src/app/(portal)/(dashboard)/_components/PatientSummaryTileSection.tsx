"use client";
import { patientApiServices } from "@/api-services/patient/api";
import { IMedicalTileSummaryResposne } from "@/api-services/patient/types";
import { DataTile } from "@/components/custom-ui/data-tile";
import DataTileSkeleton from "@/components/custom-ui/data-tile-skeleton";
import { useQuery } from "@tanstack/react-query";

const PatientSummaryTileSection = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["getMedicalTileSummary"],
    queryFn: () =>
      patientApiServices.getMedicalTileSummary<IMedicalTileSummaryResposne>(),
  });

  const summary = data || null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Your Data
      </h2>

      {isPending ? (
        // Skeleton loading
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DataTileSkeleton />
          <DataTileSkeleton />
          <DataTileSkeleton />
          <DataTileSkeleton />
        </div>
      ) : isError ? (
        <p className="text-sm text-red-500">Failed to load summary data.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Existing vitals (hardcoded or from another API) */}
          <DataTile label="Sleep" value="-" />
          <DataTile label="Steps" value="-" />

          {/* New clinical data from API */}
          <DataTile
            label="Blood Pressure"
            value={summary?.bp_latest?.toString() || "-"}
          />

          <DataTile
            label="Blood Sugar (HbA1c)"
            value={summary?.hba1c_latest?.toString() || "-"}
            unit={summary?.hba1c_latest ? "%" : ""}
            state={summary?.hba1c_flagged ? "attention" : "normal"}
          />
        </div>
      )}

      {/* Optional provenance info */}
      {!isPending && !isError && summary?.provenance && (
        <p className="mt-2 text-[10px] text-muted-foreground">
          Source: {summary.provenance.sourceSystem} · Last synced:{" "}
          {new Date(summary.provenance.lastSyncedAt).toLocaleString()}
        </p>
      )}
    </section>
  );
};

export default PatientSummaryTileSection;
