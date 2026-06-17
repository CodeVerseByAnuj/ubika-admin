import { patientApiServices } from "@/api-services/patient/api";
import { IMedicationDetailsResponse } from "@/api-services/patient/types";
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
import { CalendarDays, Clock, Pill, FileText, AlertCircle } from "lucide-react";

type ViewDetailsProps = {
  medicationId: number;
};

const ViewDetails = ({ medicationId }: ViewDetailsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getMedicationDetails", medicationId],
    queryFn: () =>
      patientApiServices.getMedicationDetails<IMedicationDetailsResponse>(
        medicationId,
      ),
    enabled: openDialog,
  });

  const medication = response?.data;

  const getStatusStyles = (status?: string | null) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      default:
        return "bg-rose-50 text-rose-700 border-rose-200";
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="min-w-full md:min-w-2xl  p-0 gap-0"
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
                : "Failed to load medication details"}
            </span>
          </div>
        ) : medication ? (
          <>
            {/* Fixed Header */}
            <DialogHeader className="border-b px-6 py-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <DialogTitle className="text-xl">
                    {medication.medication_name}
                  </DialogTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {medication.attributes.generic_drug_name}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={getStatusStyles(
                    medication.attributes.prescription_status,
                  )}
                >
                  {medication.attributes.prescription_status}
                </Badge>
              </div>
            </DialogHeader>

            {/* Scrollable Body */}
            <div className="h-[calc(90vh-80px)] overflow-y-auto px-6 py-5">
              <div className="space-y-6">
                {/* Medication Summary */}
                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {medication.attributes.dose_range_text}{" "}
                        {medication.attributes.dose_unit}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {medication.attributes.interval_time} •{" "}
                        {medication.attributes.route}
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
                        Effective Date
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(medication.effectiveAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {medication.attributes.duration_amount}{" "}
                      {medication.attributes.duration_unit}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Type of Use</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {medication.attributes.type_of_use}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Prescribing Provider</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      #{medication.attributes.prescribing_provider_id}
                    </p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Instructions</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {medication.attributes.instructions_display_text}
                  </p>
                </div>

                {/* Additional Information */}
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Additional Information</h3>

                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">Generic ID:</span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.generic_id}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Ingredient Count:
                      </span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.ingredient_count}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        External Medication:
                      </span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.is_external ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">PRN:</span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.is_prn ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Concurrent:</span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.is_concurrent ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Dosage ID:</span>
                      <span className="ml-2 font-medium">
                        {medication.attributes.dosage_id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                {medication.attributes.note && (
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Note</h3>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {medication.attributes.note}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t pt-4 text-xs text-muted-foreground">
                  <p>
                    Last Modified:{" "}
                    {medication.attributes.prescription_last_modified_ts}
                  </p>

                  <p className="mt-1">
                    Source: {medication.provenance.sourceSystem}
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
