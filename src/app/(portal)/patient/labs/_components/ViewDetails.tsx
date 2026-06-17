import { patientApiServices } from "@/api-services/patient/api";
import { ILabDetailsResponse } from "@/api-services/patient/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  FileText,
  AlertCircle,
  Beaker,
  Hash,
  User,
} from "lucide-react";

type ViewDetailsProps = {
  labId: number;
};

const ViewDetails = ({ labId }: ViewDetailsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getLabDetails", labId],
    queryFn: () => patientApiServices.getLabDetails<ILabDetailsResponse>(labId),
    enabled: openDialog,
  });

  const lab = response?.data;

  const getStatusStyles = (isActive: boolean) => {
    return isActive
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="min-w-full md:min-w-2xl p-0 gap-0"
      >
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Spinner className="h-6 w-6 animate-spin" />
          </div>
        ) : isError ? (
          <div className="m-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>
              {error instanceof Error
                ? error.message
                : "Failed to load lab details"}
            </span>
          </div>
        ) : lab ? (
          <>
            {/* Fixed Header */}
            <DialogHeader className="border-b px-6 py-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <DialogTitle className="text-xl">
                    {lab.observation_label}
                  </DialogTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Lab ID: {lab.id} • {lab.type}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={getStatusStyles(lab.attributes.is_active)}
                >
                  {lab.attributes.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </DialogHeader>

            {/* Scrollable Body */}
            <div className="h-[calc(90vh-80px)] overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                {/* Result Summary */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Beaker className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {lab.attributes.observation_value}{" "}
                        {lab.attributes.observation_units}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Numeric value:{" "}
                        {lab.attributes.observation_value_numeric}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Collection Date
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(lab.attributes.collection_ts).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Observation Date
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(lab.attributes.observation_ts).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Test ID</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lab.attributes.test_id}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Result ID</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lab.attributes.result_id}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Lab Group</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lab.attributes.lab_group_id}
                      {lab.attributes.base_group_id &&
                        ` (Base: ${lab.attributes.base_group_id})`}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Source</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Source ID: {lab.attributes.source_id}
                    </p>
                  </div>
                </div>

                {/* Review with patient & additional info */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Additional Information</h3>
                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">
                        Review with Patient:
                      </span>
                      <span className="ml-2 font-medium">
                        {lab.attributes.review_with_patient ? "Yes" : "No"}
                      </span>
                    </div>
                    {lab.attributes.transaction_ts && (
                      <div>
                        <span className="text-muted-foreground">
                          Transaction TS:
                        </span>
                        <span className="ml-2 font-medium">
                          {new Date(
                            lab.attributes.transaction_ts,
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {lab.attributes.version_ts && (
                      <div>
                        <span className="text-muted-foreground">
                          Version TS:
                        </span>
                        <span className="ml-2 font-medium">
                          {new Date(lab.attributes.version_ts).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Note */}
                {lab.attributes.external_note && (
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Note</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lab.attributes.external_note}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t pt-4 text-xs text-muted-foreground">
                  <p>Effective: {new Date(lab.effectiveAt).toLocaleString()}</p>
                  <p className="mt-1">
                    Source: {lab.provenance.sourceSystem} • Record Type:{" "}
                    {lab.provenance.sourceRecordType} • Last Synced:{" "}
                    {new Date(lab.provenance.lastSyncedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
