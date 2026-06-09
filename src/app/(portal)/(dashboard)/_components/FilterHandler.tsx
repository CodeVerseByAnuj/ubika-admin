/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CalendarIcon, Filter } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/LoadingButton";

type FilterHandlerProps = {
  date: {
    startDate: string;
    endDate: string;
  };
  setDate: Dispatch<
    SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  loading: boolean;
};

const FilterHandler = ({ date, setDate, loading }: FilterHandlerProps) => {
  const today = new Date();
  const [tempDate, setTempDate] = useState(date);

  useEffect(() => {
    setTempDate(date);
  }, [date]);

  // Disable future dates
  const isDateDisabled = (currentDate: Date) => {
    return currentDate > today;
  };

  // YYYY-MM-DD → Date
  const parseDate = (value?: string): Date | undefined => {
    if (!value) return undefined;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Date → YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA");
  };

  const handleApply = () => {
    setDate(tempDate);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Start Date */}
      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal min-w-[180px]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {tempDate.startDate || "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              disabled={isDateDisabled}
              selected={parseDate(tempDate.startDate)}
              onSelect={(value: Date | undefined) => {
                if (!value) return;
                const startDate = new Date(value);
                const endDate = new Date(value);
                endDate.setMonth(endDate.getMonth() + 1);
                if (endDate > today) {
                  endDate.setTime(today.getTime());
                }
                setTempDate({
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <Label>End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal min-w-[180px]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {tempDate.endDate || "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              disabled={isDateDisabled}
              selected={parseDate(tempDate.endDate)}
              onSelect={(value: Date | undefined) => {
                if (!value) return;
                setTempDate((prev) => ({
                  ...prev,
                  endDate: formatDate(value),
                }));
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Apply Button */}
      <LoadingButton isLoading={loading} onClick={handleApply}>
        <Filter className="mr-1 h-4 w-4" /> Apply
      </LoadingButton>
    </div>
  );
};

export default FilterHandler;
