"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";

interface LabFiltersProps {
  onFiltersChange: (filters: {
    observation_label?: string;
    type?: string;
    effectiveAt?: string;
  }) => void;
  initialFilters?: {
    observation_label?: string;
    type?: string;
    effectiveAt?: string;
  };
  onClear?: () => void;
}

const LabFilters = ({
  onFiltersChange,
  initialFilters = {},
  onClear,
}: LabFiltersProps) => {
  const [localFilters, setLocalFilters] = useState({
    observation_label: initialFilters.observation_label || "",
    type: initialFilters.type || "",
    effectiveAt: initialFilters.effectiveAt || "",
  });

  const hasFilters = Object.values(localFilters).some((v) => v !== "");

  const handleInputChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearField = (field: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleClearAll = () => {
    setLocalFilters({
      observation_label: "",
      type: "",
      effectiveAt: "",
    });
    // Immediately notify parent to clear filters
    onFiltersChange({});
    onClear?.();
  };

  const handleApply = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(localFilters).filter(([_, v]) => v !== ""),
    );
    onFiltersChange(activeFilters);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-white p-4">
      {/* Observation Label */}
      <div className="relative min-w-[180px] flex-1">
        <Label htmlFor="observation_label" className="text-sm font-medium">
          Observation Label
        </Label>

        <div className="relative mt-1">
          <Input
            id="observation_label"
            placeholder="e.g. LDL"
            value={localFilters.observation_label}
            onChange={(e) =>
              handleInputChange("observation_label", e.target.value)
            }
            className="pr-8"
          />

          {localFilters.observation_label && (
            <button
              type="button"
              onClick={() => clearField("observation_label")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Record Type */}
      <div className="min-w-[180px] flex-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="type" className="text-sm font-medium">
            Record Type
          </Label>

          {localFilters.type && (
            <button
              type="button"
              onClick={() => clearField("type")}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-1">
          <Select
            value={localFilters.type || "all"}
            onValueChange={(value) =>
              handleInputChange("type", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="lab_result">Lab Result</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Effective Date */}
      <div className="relative min-w-[180px] flex-1">
        <Label htmlFor="effectiveAt" className="text-sm font-medium">
          Effective Date
        </Label>

        <div className="relative mt-1">
          <Input
            id="effectiveAt"
            type="date"
            value={localFilters.effectiveAt}
            onChange={(e) => handleInputChange("effectiveAt", e.target.value)}
            className="pr-8"
          />

          {localFilters.effectiveAt && (
            <button
              type="button"
              onClick={() => clearField("effectiveAt")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="h-9 px-3"
          >
            <X className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        )}

        <Button
          variant="default"
          size="sm"
          onClick={handleApply}
          className="h-9 px-3"
        >
          <Search className="mr-1 h-4 w-4" />
          Apply
        </Button>
      </div>
    </div>
  );
};

export default LabFilters;
