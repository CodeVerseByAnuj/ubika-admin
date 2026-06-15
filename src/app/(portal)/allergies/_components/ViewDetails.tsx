"use client";

import { IAllergies } from "@/api-services/patient/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  Calendar,
  Info,
  AlertCircle,
  Pill,
  Activity,
} from "lucide-react";

const ViewDetails = ({ allergy }: { allergy: IAllergies }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "destructive";
      case "resolved":
        return "default";
      case "inactive":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeverityColor = (severity: string) => {
    if (severity?.toLowerCase().includes("severe"))
      return "text-red-600 bg-red-50";
    if (severity?.toLowerCase().includes("moderate"))
      return "text-orange-600 bg-orange-50";
    if (severity?.toLowerCase().includes("mild"))
      return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="w-full justify-start">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-full md:min-w-2xl">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-xl font-bold">
            Allergy Details
          </DialogTitle>
          <DialogDescription className="text-sm">
            Key clinical information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="bg-gray-50/50 px-4 py-3 border-b flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" />
              <h3 className="font-semibold">Basic Information</h3>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Allergy Name
                </div>
                <div className="font-medium text-base flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5 text-gray-400" />
                  {allergy.allergy_name || "N/A"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Type
                </div>
                <Badge variant="outline" className="font-normal">
                  {allergy.type || "N/A"}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Effective Date
                </div>
                <div className="font-mono text-sm">
                  {formatDate(allergy.effectiveAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Attributes (Only essential fields) */}
          {allergy.attributes && (
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="bg-gray-50/50 px-4 py-3 border-b flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">Clinical Details</h3>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">
                    Clinical Status
                  </div>
                  <Badge
                    variant={getStatusBadge(allergy.attributes.clinical_status)}
                  >
                    {allergy.attributes.clinical_status || "N/A"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Severity</div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                      allergy.attributes.allergy_severity_code,
                    )}`}
                  >
                    {allergy.attributes.allergy_severity_code || "N/A"}
                  </span>
                </div>
                <div className="space-y-1 col-span-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Reaction
                  </div>
                  <div className="flex flex-wrap gap-2 items-baseline">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {allergy.attributes.reaction_code || "N/A"}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {allergy.attributes.reaction_description ||
                        "No description"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetails;
