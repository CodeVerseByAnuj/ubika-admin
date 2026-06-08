"use client";

import React, { useState } from "react";
import { ShieldCheck, CalendarDays } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/LoadingButton";

interface ConsentPolicy {
  id: number;
  name: string;
  body: string;
  effective_date: string;
}

const policy: ConsentPolicy = {
  id: 1,
  name: "Initial Consent",
  body: "Test consent policy",
  effective_date: "2026-06-01",
};

const PolicyDetailsForm = () => {
  const [accepted, setAccepted] = useState(false);

  const formatted = new Date(policy.effective_date).toLocaleDateString(
    "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="w-full">
      <div className="my-4 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Review & Accept Policy
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Please review the consent policy below and accept it before
          continuing.
        </p>
      </div>

      {/* Policy Card */}
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-primary/10 px-5 py-3 border-b">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {policy.name}
            </span>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Policy #{policy.id}
          </span>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-sm leading-6 text-foreground">{policy.body}</p>

          <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 w-fit">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Effective from{" "}
              <span className="text-foreground font-semibold">{formatted}</span>
            </span>
          </div>
        </div>
      </div>
   
      {/* Button */}
      <div className="mt-5">
        <LoadingButton disabled={!accepted} className="h-10 w-full">
          Continue
        </LoadingButton>
      </div>
    </div>
  );
};

export default PolicyDetailsForm;
