"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/common/LoadingButton";
import { HealthCardSchema, type HealthCardFormData } from "@/api-services/on-boarding/types";
import { createHealthCard } from "@/api-services/on-boarding/createHealthCard";

const HealthDetailsForm = ({ onNext }: { onNext?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HealthCardFormData>({
    resolver: zodResolver(HealthCardSchema),
    defaultValues: { hc_number: "", hc_version: "" },
  });

  const onSubmit = async (data: HealthCardFormData) => {
    await createHealthCard(data);
    onNext?.();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 my-4">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Fill Your Health Information
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Please provide your Ontario Health Insurance Plan (OHIP) details to
          securely verify your identity and access your clinical records safely.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="hc_number">Health Card Number</FieldLabel>
          <FieldContent>
            <Input
              id="hc_number"
              type="text"
              inputMode="numeric"
              placeholder="Enter Health Card number"
              aria-invalid={!!errors.hc_number}
              {...register("hc_number")}
            />
            <FieldError errors={[errors.hc_number]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="hc_version">Health Card Version</FieldLabel>
          <FieldContent>
            <Input
              id="hc_version"
              type="text"
              placeholder="Enter Health Card version"
              maxLength={2}
              aria-invalid={!!errors.hc_version}
              {...register("hc_version")}
            />
            <FieldError errors={[errors.hc_version]} />
          </FieldContent>
        </Field>

        <div>
          <LoadingButton type="submit" isLoading={isSubmitting} className="w-full h-10">
            Continue
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default HealthDetailsForm;
