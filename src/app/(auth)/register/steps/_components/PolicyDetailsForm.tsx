"use client";

import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import LoadingButton from "@/components/common/LoadingButton";

const policies = [
  "Patient Privacy Protection",
  "Medical Data Confidentiality",
  "Secure Health Record Access",
  "Authorized Healthcare Usage",
  "OHIP Identity Verification",
  "Clinical Information Security",
];

const PolicyDetailsForm = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="w-full">
      <div className="my-4 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Review & Accept Policy
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Please review your submitted OHIP details and accept the privacy
          policy before continuing.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border bg-card p-3 transition hover:border-primary/40 hover:bg-muted/30"
          >
            {/* Number */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium leading-5 text-foreground">
              {policy}
            </h3>
          </div>
        ))}
      </div>

      {/* Checkbox */}
      <div className="mt-5 flex gap-3 rounded-xl border bg-muted/40 p-3">
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
          I have read and agree to the privacy policy and consent to the
          processing of my OHIP information.
        </Label>
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
