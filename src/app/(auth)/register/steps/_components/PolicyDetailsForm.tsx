"use client";

import React, { useState } from "react";
import { ShieldCheck, CalendarDays, CheckCircle2, Circle } from "lucide-react";

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

const PolicyDetailsForm = ({ onNext }: { onNext?: () => void }) => {
  const [selected, setSelected] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const formatted = new Date(policy.effective_date).toLocaleDateString(
    "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const handleSelect = () => {
    setSelected((prev) => {
      if (prev) setAccepted(false);
      return !prev;
    });
  };

  return (
    <div className="w-full">
      <div className="my-4 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Review & Accept Policy
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Select the policy to review, then accept it before continuing.
        </p>
      </div>

      {/* Policy Card */}
      <button
        type="button"
        onClick={handleSelect}
        className={`w-full text-left rounded-2xl border shadow-sm overflow-hidden transition-all ${
          selected
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/40"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary/10 px-5 py-3 border-b">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {policy.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Policy #{policy.id}
            </span>
            {selected ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/40" />
            )}
          </div>
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
      </button>

      {/* Accept checkbox — shown only after policy is selected */}
      {selected && (
        <div className="mt-4 flex gap-3 rounded-xl border bg-muted/40 p-3">
          <Checkbox
            id="acceptPolicy"
            className="mt-1 border border-black"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
          />
          <Label
            htmlFor="acceptPolicy"
            className="cursor-pointer text-sm leading-6"
          >
            {`I have read and agree to the ${policy.name} and consent to the processing of my OHIP information.`}
          </Label>
        </div>
      )}

      {/* Button */}
      <div className="mt-5">
        <LoadingButton
          disabled={!selected || !accepted}
          className="h-10 w-full"
          onClick={onNext}
        >
          Continue
        </LoadingButton>
      </div>
    </div>
  );
};

export default PolicyDetailsForm;
