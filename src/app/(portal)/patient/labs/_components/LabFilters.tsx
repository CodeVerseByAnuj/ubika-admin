"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface LabFiltersProps {
  onFiltersChange: (filters: { observation_label?: string }) => void;
  initialFilters?: { observation_label?: string };
}

const LabFilters = ({ onFiltersChange, initialFilters = {} }: LabFiltersProps) => {
  const [value, setValue] = useState(initialFilters.observation_label || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(value ? { observation_label: value } : {});
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search by lab name..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          type="button"
          onClick={() => handleChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default LabFilters;
