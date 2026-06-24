/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { patientApiServices } from "@/api-services/patient/api";
import { IAppointmentDetailsResposne } from "@/api-services/patient/types";
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
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewDetailsProps = {
  appointmentId: number;
  children?: React.ReactNode;
};

const ViewDetails = ({ appointmentId, children }: ViewDetailsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAppointmentsDetails", appointmentId],
    queryFn: () =>
      patientApiServices.getAppointmentsDetails<IAppointmentDetailsResposne>(
        appointmentId,
      ),
    enabled: !!openDialog,
  });

  const appointment = response?.data;

  // Status configuration with custom status-based card backgrounds
  const getStatus = (attrs: any) => {
    if (attrs.is_deleted)
      return {
        label: "Deleted",
        className: "bg-stone-100 text-stone-700 border-stone-200",
        cardBg: "bg-stone-50/70 dark:bg-stone-950/20",
        icon: XCircle,
      };
    if (attrs.is_cancelled)
      return {
        label: "Cancelled",
        className: "bg-red-50 text-red-700 border-red-200",
        cardBg: "bg-red-50/30 dark:bg-red-950/10",
        icon: XCircle,
      };
    if (attrs.has_arrived)
      return {
        label: "Arrived",
        className: "bg-green-50 text-green-700 border-green-200",
        cardBg: "bg-green-50/30 dark:bg-green-950/10",
        icon: CheckCircle2,
      };
    if (attrs.is_confirmed)
      return {
        label: "Confirmed",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        cardBg: "bg-blue-50/30 dark:bg-blue-950/10",
        icon: CheckCircle2,
      };
    return {
      label: "Scheduled",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      cardBg: "bg-amber-50/30 dark:bg-amber-950/10",
      icon: CalendarDays,
    };
  };

  const statusConfig = appointment ? getStatus(appointment?.attributes) : null;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children ? (
          <div className="cursor-pointer">{children}</div>
        ) : (
          <Button size="sm">View Details</Button>
        )}
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className={cn(
          "max-w-md p-6 gap-0 overflow-hidden transition-colors duration-200",
        )}
      >
        <DialogTitle className="sr-only">Appointment Details</DialogTitle>

        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Spinner className="h-6 w-6 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>
              {error instanceof Error
                ? error?.message
                : "Failed to load details"}
            </span>
          </div>
        ) : appointment && statusConfig ? (
          <div className="space-y-5">
            {/* Header Area */}
            <DialogHeader className="text-left flex flex-row items-center justify-between gap-4 space-y-0 pb-4 border-b pr-6">
              {/* VisuallyHidden implementation via Tailwind utilities for maximum standard compliance */}
              <DialogTitle className="sr-only">
                {appointment.type?.toLowerCase().replace(/_/g, " ") ||
                  "Appointment Details"}
              </DialogTitle>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                  Appointment Details
                </span>
                <p className="text-lg font-bold capitalize text-foreground leading-tight">
                  {appointment.type?.toLowerCase().replace(/_/g, " ") ||
                    "General Visit"}
                </p>
              </div>

              {(() => {
                const Icon = statusConfig.icon;
                return (
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold shrink-0 border shadow-sm",
                      statusConfig.className,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {statusConfig.label}
                  </Badge>
                );
              })()}
            </DialogHeader>

            {/* Date and Time Block */}
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(
                      appointment.appointment_start_time,
                    ).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(
                      appointment?.appointment_start_time,
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(
                      appointment?.appointment_end_time,
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Information list */}
            <div className="space-y-3.5 px-1">
              {/* Provider Info */}
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs">
                    Assigned Doctor/Provider
                  </p>
                  <p className="font-medium text-foreground mt-0.5">
                    Dr. (ID: #{appointment?.attributes?.provider_id})
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs">
                    Service Location
                  </p>
                  <p className="font-medium text-foreground mt-0.5">
                    {appointment?.attributes?.service_location ||
                      "Location not specified"}
                  </p>
                </div>
              </div>

              {/* Reason Code Info */}
              <div className="flex items-start gap-3">
                <HelpCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs">Reason Code</p>
                  <p className="font-medium text-foreground mt-0.5">
                    {appointment?.attributes?.reason_id
                      ? `#${appointment.attributes.reason_id}`
                      : "Not provided"}
                  </p>
                </div>
              </div>

              {/* Bill Only Condition Highlight */}
              {appointment?.attributes?.is_bill_only && (
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
                  <div className="text-sm">
                    <p className="text-amber-700 text-xs font-semibold">
                      Special Note
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      This is a bill-only entry record. No physical visit
                      required.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tracking Reference */}
            <div className="pt-2 text-center">
              <span className="text-xs bg-background/50 border px-2.5 py-1 rounded text-muted-foreground font-mono">
                Ref: #
                {appointment?.attributes?.appointment_uuid
                  ?.slice(0, 8)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
