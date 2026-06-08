"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/common/LoadingButton";

const BasicDetailsForm = () => {
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
              />
            </FieldContent>
          </Field>

          {/* Last Name */}
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>

            <FieldContent>
              <Input id="lastName" type="text" placeholder="Enter last name" />
            </FieldContent>
          </Field>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>

            <FieldContent>
              <Select>
                <SelectTrigger className=" w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>

                  <SelectItem value="female">Female</SelectItem>

                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          {/* DOB */}
          <Field>
            <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>

            <FieldContent>
              <Input id="dob" type="date" />
            </FieldContent>
          </Field>
        </div>

        {/* OTP Number */}
        {/* <Field>
          <FieldLabel htmlFor="ohpNumber">OHP Number</FieldLabel>

          <FieldContent>
            <Input
              id="ohpNumber"
              type="text"
              inputMode="numeric"
              placeholder="Enter OHP number"
            />
          </FieldContent>
        </Field> */}
        <div>
          <LoadingButton className="w-full h-10"> Continue</LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsForm;
