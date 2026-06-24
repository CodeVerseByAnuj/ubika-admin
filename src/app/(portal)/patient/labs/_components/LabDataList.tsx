"use client";

import { useState } from "react";
import { ILabDateGroup } from "@/api-services/patient/types";
import LabCard from "./LabCard";
import { format } from "date-fns";
import { ChevronRight, FlaskConical } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type LabDataListProps = {
  labList: ILabDateGroup[];
};

const LabDataList = ({ labList }: LabDataListProps) => {
  const hasResults = labList.some((group) => group.observations.length > 0);
  const [openDates, setOpenDates] = useState<Set<string>>(new Set());

  const toggle = (date: string) => {
    setOpenDates((prev) => {
      const next = new Set(prev);
      next.has(date) ? next.delete(date) : next.add(date);
      return next;
    });
  };

  if (!hasResults) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No Labs Found
      </div>
    );
  }

  return (
    <div className="divide-y rounded-xl border bg-card overflow-hidden">
      {labList.map((group) => {
        const isOpen = openDates.has(group.date);
        const totalResults = group.observations.reduce(
          (sum, obs) => sum + obs.results.length,
          0,
        );

        return (
          <Collapsible
            key={group.date}
            open={isOpen}
            onOpenChange={() => toggle(group.date)}
          >
            <CollapsibleTrigger className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-accent/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <FlaskConical className="h-5 w-5 text-blue-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">
                  {format(new Date(group.date), "MMM d, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {totalResults} result{totalResults !== 1 ? "s" : ""}
                </p>
              </div>
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-2 border-t bg-muted/30 px-4 py-3">
                {group.observations.flatMap((obs) =>
                  obs.results.map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                  )),
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default LabDataList;
