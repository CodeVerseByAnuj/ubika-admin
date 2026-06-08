"use client";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/common/LoadingButton";

const HealthDetailsForm = ({ onNext }: { onNext?: () => void }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 my-4">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Fill Your Personal Information
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Please provide your Ontario Health Insurance Plan (OHIP) details to
          securely verify your identity and access your clinical records safely.
        </p>
      </div>
      <div className="space-y-6">
        <Field>
          <FieldLabel htmlFor="hc_version">HC Version</FieldLabel>
          <FieldContent>
            <Input id="hc_version" type="text" placeholder="Enter HC version" />
          </FieldContent>
        </Field>

        {/* OTP Number */}
        <Field>
          <FieldLabel htmlFor="hcNumber">HC Number</FieldLabel>

          <FieldContent>
            <Input
              id="hcNumber"
              type="text"
              inputMode="numeric"
              placeholder="Enter HC number"
            />
          </FieldContent>
        </Field>
        <div>
          <LoadingButton className="w-full h-10" onClick={onNext}> Continue</LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default HealthDetailsForm;
