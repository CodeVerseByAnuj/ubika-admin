"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, CalendarDays, CheckCircle2, Circle } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/LoadingButton";
import {
  OnPolicyConsentSchema,
  type OnPolicyConsent,
} from "@/api-services/on-boarding/types";
import { getCurrentPolicy } from "@/api-services/on-boarding/getCurrentPolicy";
import { createPolicyConsent } from "@/api-services/on-boarding/createPolicyConsent";

const PolicyDetailsForm = ({ onNext }: { onNext?: () => void }) => {
  const [selected, setSelected] = useState(false);

  const {
    data: policy,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["current-policy"],
    queryFn: getCurrentPolicy,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnPolicyConsent>({
    resolver: zodResolver(OnPolicyConsentSchema),
    defaultValues: { consent_policy_id: 0 },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const accepted = (watch("consent_policy_id") ?? 0) > 0;

  const formatted = policy
    ? new Date(policy.effective_date).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const onSubmit = async (data: OnPolicyConsent) => {
    await createPolicyConsent(data);
    onNext?.();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        Loading policy…
      </div>
    );
  }

  if (isError || !policy) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-destructive">
        Failed to load policy. Please refresh and try again.
      </div>
    );
  }

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Policy Card */}
        <button
          type="button"
          onClick={() => setSelected((prev) => !prev)}
          className={`w-full text-left rounded-lg border overflow-hidden transition-all ${
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
                <span className="text-foreground font-semibold">
                  {formatted}
                </span>
              </span>
            </div>
          </div>
        </button>

        {/* Accept checkbox — shown only after policy is selected */}
        {selected && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 rounded-xl border bg-muted/40 p-3">
              <Checkbox
                id="acceptPolicy"
                className="mt-1 border border-black"
                checked={accepted}
                onCheckedChange={(checked) =>
                  setValue("consent_policy_id", checked ? policy.id : 0, {
                    shouldValidate: true,
                  })
                }
              />
              <Label
                htmlFor="acceptPolicy"
                className="cursor-pointer text-sm leading-6"
              >
                {`I have read and agree to the ${policy.name} and consent to the processing of my OHIP information.`}
              </Label>
            </div>
          </div>
        )}
        {errors.consent_policy_id && (
          <p className="text-sm text-destructive">
            {errors.consent_policy_id.message}
          </p>
        )}
        {/* Button */}
        <div className="mt-5">
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            className="h-10 w-full"
          >
            Continue
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default PolicyDetailsForm;
