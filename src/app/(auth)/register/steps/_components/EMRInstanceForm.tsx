"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import LoadingButton from "@/components/common/LoadingButton";
import SuccessDialog from "./SuccessDialog";

const EMRInstanceForm = () => {
  const [emrInstance, setEmrInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  async function onSubmit() {
    setLoading(true);
    await new Promise((res) => {
      setTimeout(res, 2000);
    });
    setLoading(false);
    return setOpenSuccess(true);
  }
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

      {/* Select Box */}
      <div className="space-y-2">
        <Label htmlFor="emrInstance">EMR Instance</Label>

        <Select value={emrInstance} onValueChange={setEmrInstance}>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Select EMR instance" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="hospital-emr">Hospital EMR</SelectItem>

            <SelectItem value="clinic-emr">Clinic EMR</SelectItem>

            <SelectItem value="primary-care">Primary Care EMR</SelectItem>

            <SelectItem value="mental-health">Mental Health EMR</SelectItem>

            <SelectItem value="diagnostic-center">
              Diagnostic Center EMR
            </SelectItem>

            <SelectItem value="telemedicine">Telemedicine EMR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      <div className="mt-5">
        <LoadingButton
          onClick={onSubmit}
          isLoading={loading}
          disabled={!emrInstance}
          className="h-10 w-full"
        >
          Continue
        </LoadingButton>
      </div>
    </div>
  );
};

export default EMRInstanceForm;
