"use client";
import { patientApiServices } from "@/api-services/patient/api";
import { IMedicalTileSummaryResposne } from "@/api-services/patient/types";
import { DataTile } from "@/components/custom-ui/data-tile";
import DataTileSkeleton from "@/components/custom-ui/data-tile-skeleton";
import { useQuery } from "@tanstack/react-query";
import { Droplets, Weight, PersonStanding, Moon } from "lucide-react";

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
        Your Readiness Metrics
      </h2>

      {isPending ? (
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
          <DataTile
            label="HBA1C"
            value={summary?.hba1c_latest?.toString() || "6.8"}
            unit="%"
            state={summary?.hba1c_flagged ? "attention" : "normal"}
            icon={Droplets}
          />

          <DataTile
            label="Weight"
            value="71.0"
            unit="kg"
            icon={Weight}
          />

          <DataTile
            label="Movement"
            value="8,432"
            unit="steps"
            icon={PersonStanding}
            dots={{ total: 7, filled: 5 }}
          />

          <DataTile
            label="Sleep"
            value="7h 12m"
            icon={Moon}
            dots={{ total: 7, filled: 5 }}
          />
        </div>
      )}
    </section>
  );
};

export default PatientSummaryTileSection;
