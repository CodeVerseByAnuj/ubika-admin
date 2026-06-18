"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import LoadingButton from "@/components/common/LoadingButton";
import SuccessDialog from "./SuccessDialog";
import { EmrLinkingSchema, type EmrLinkingFormData } from "@/api-services/on-boarding/types";
import { getEmrInstances } from "@/api-services/on-boarding/getEmrInstances";
import { createEmrLinking } from "@/api-services/on-boarding/createEmrLinking";

const EMRInstanceForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const { data: emrInstances = [], isLoading, isError } = useQuery({
    queryKey: ["emr-instances"],
    queryFn: getEmrInstances,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmrLinkingFormData>({
    resolver: zodResolver(EmrLinkingSchema),
    defaultValues: { emrInstanceId: "" },
  });

  const onSubmit = async (data: EmrLinkingFormData) => {
    await createEmrLinking(data);
    setOpenSuccess(true);
  };

  return (
    <div className="w-full">
      <SuccessDialog open={openSuccess} setOpen={setOpenSuccess} />

      {/* Header */}
      <div className="my-4 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          Select EMR Instance
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Please choose the EMR instance you want to access for managing your
          clinical records and healthcare information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field data-invalid={!!errors.emrInstanceId}>
          <FieldLabel htmlFor="emrInstanceId">EMR Instance</FieldLabel>
          <FieldContent>
            <Controller
              name="emrInstanceId"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  disabled={isLoading || isError}
                >
                  <SelectTrigger
                    id="emrInstanceId"
                    className="h-11 w-full"
                    aria-invalid={!!errors.emrInstanceId}
                  >
                    <SelectValue
                      placeholder={
                        isLoading
                          ? "Loading instances…"
                          : isError
                            ? "Failed to load instances"
                            : "Select EMR instance"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {emrInstances.map((instance) => (
                      <SelectItem key={instance.id} value={instance.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{instance.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.emrInstanceId]} />
          </FieldContent>
        </Field>

        <div>
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

export default EMRInstanceForm;
