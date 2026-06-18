"use client";
import { patientApiServices } from "@/api-services/patient/api";
import { ILettersDetailsResponse } from "@/api-services/patient/types";
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
import { CalendarDays, FileText, AlertCircle } from "lucide-react";

type ViewDetailsProps = {
  letterId: number;
};

const ViewDetails = ({ letterId }: ViewDetailsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getLettersDetails", letterId],
    queryFn: () =>
      patientApiServices.getLattersDetails<ILettersDetailsResponse>(letterId),
    enabled: openDialog,
  });

  const letter = response?.data;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button size="sm">View Details</Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="min-w-full md:min-w-3xl p-0 gap-0"
      >
        <DialogTitle className="sr-only">Letter Details</DialogTitle>

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
                : "Failed to load letter details"}
            </span>
          </div>
        ) : letter ? (
          <>
            {/* Header */}
            <DialogHeader className="border-b px-6 py-4">
              <div>
                <DialogTitle className="font-serif text-xl mb-1">
                  {letter.title}
                </DialogTitle>

                <p className="mb-2 text-sm text-muted-foreground">
                  LetterID : {letter.attributes.letter_id}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={
                      letter.attributes.letter_status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : ""
                    }
                  >
                    {letter.attributes.letter_status}
                  </Badge>

                  <Badge
                    variant={
                      letter.attributes.is_letter_read
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {letter.attributes.is_letter_read ? "Read" : "Unread"}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="h-[calc(80vh-80px)] overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {/* Letter Content */}
                <div className="rounded-xl border p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Letter Content</h3>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {letter.content}
                  </p>
                </div>

                {/* Overview */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Created Date</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(letter.effectiveAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Reviewed Date</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(letter.attributes.reviewed_ts).toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Days Since Created</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {letter.attributes.days_since_created} days
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <p className="text-sm font-medium">Letter Version</p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Version {letter.attributes.letter_version}
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                {/* <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Additional Information</h3>

                  <div className="grid gap-3 text-sm md:grid-cols-2">
                    <div>
                      <span className="text-muted-foreground">
                        Active Version:
                      </span>

                      <span className="ml-2 font-medium">
                        {letter.attributes.is_active_version ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">XML Format:</span>

                      <span className="ml-2 font-medium">
                        {letter.attributes.is_xml ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Archived:</span>

                      <span className="ml-2 font-medium">
                        {letter.attributes.is_archived ? "Yes" : "No"}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Locked:</span>

                      <span className="ml-2 font-medium">
                        {letter.attributes.is_locked ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div> */}

                {/* Footer */}
                <div className="border-t pt-4 text-xs text-muted-foreground">
                  <p>
                    Modified:{" "}
                    {new Date(letter.attributes.modified_ts).toLocaleString()}
                  </p>

                  <p className="mt-1">
                    Source: {letter.provenance.sourceSystem}
                    {" • "}
                    {letter.provenance.sourceRecordType}
                  </p>

                  <p className="mt-1">
                    Last Synced:{" "}
                    {new Date(letter.provenance.lastSyncedAt).toLocaleString()}
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
