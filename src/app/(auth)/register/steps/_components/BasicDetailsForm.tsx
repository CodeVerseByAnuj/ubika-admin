"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/common/LoadingButton";
import { createOnBoarding } from "@/api-services/on-boarding/createOnBoarding";
import { OnBoardingSchema, type OnBoardingFormData } from "@/api-services/on-boarding/type";

const BasicDetailsForm = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnBoardingFormData>({
    resolver: zodResolver(OnBoardingSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: OnBoardingFormData) => {
    await createOnBoarding({
      first_name: data.firstName,
      last_name: data.lastName,
      sex: (data.gender.charAt(0).toUpperCase() + data.gender.slice(1)) as "Male" | "Female" | "Other",
      dob: data.dob,
    });
    onNext();
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <FieldContent>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
              <FieldError errors={[errors.firstName]} />
            </FieldContent>
          </Field>

          {/* Last Name */}
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <FieldContent>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
              <FieldError errors={[errors.lastName]} />
            </FieldContent>
          </Field>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <FieldContent>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select name={field.name} onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="gender" className="w-full" aria-invalid={!!errors.gender}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.gender]} />
            </FieldContent>
          </Field>

          {/* DOB */}
          <Field>
            <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
            <FieldContent>
              <Input id="dob" type="date" aria-invalid={!!errors.dob} {...register("dob")} />
              <FieldError errors={[errors.dob]} />
            </FieldContent>
          </Field>
        </div>

        <div>
          <LoadingButton type="submit" isLoading={isSubmitting} className="w-full h-10">
            Continue
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
