/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LabCard from "./LabCard";

const labResults = [
  {
    id: 815,
    type: "lab_result",
    observation_label: "Total CHOL",
    effectiveAt: "2026-02-26T14:33:40Z",
    attributes: {
      observation_value: "6.7",
      observation_units: "mmol/L",
      status: "High",
    },
  },
  {
    id: 816,
    type: "lab_result",
    observation_label: "HDL Cholesterol",
    effectiveAt: "2026-02-20T10:15:00Z",
    attributes: {
      observation_value: "1.4",
      observation_units: "mmol/L",
      status: "Normal",
    },
  },
  {
    id: 817,
    type: "lab_result",
    observation_label: "LDL Cholesterol",
    effectiveAt: "2026-02-18T09:00:00Z",
    attributes: {
      observation_value: "4.2",
      observation_units: "mmol/L",
      status: "High",
    },
  },
  {
    id: 818,
    type: "lab_result",
    observation_label: "Triglycerides",
    effectiveAt: "2026-02-15T12:00:00Z",
    attributes: {
      observation_value: "1.9",
      observation_units: "mmol/L",
      status: "Borderline",
    },
  },
  {
    id: 819,
    type: "lab_result",
    observation_label: "Blood Glucose",
    effectiveAt: "2026-02-14T08:45:00Z",
    attributes: {
      observation_value: "5.8",
      observation_units: "mmol/L",
      status: "Normal",
    },
  },
  {
    id: 820,
    type: "lab_result",
    observation_label: "Hemoglobin",
    effectiveAt: "2026-02-10T11:20:00Z",
    attributes: {
      observation_value: "13.5",
      observation_units: "g/dL",
      status: "Normal",
    },
  },
  {
    id: 821,
    type: "lab_result",
    observation_label: "Vitamin D",
    effectiveAt: "2026-02-08T02:15:00Z",
    attributes: {
      observation_value: "22",
      observation_units: "ng/mL",
      status: "Low",
    },
  },
  {
    id: 822,
    type: "lab_result",
    observation_label: "TSH",
    effectiveAt: "2026-02-06T01:30:00Z",
    attributes: {
      observation_value: "2.1",
      observation_units: "mIU/L",
      status: "Normal",
    },
  },
  {
    id: 823,
    type: "lab_result",
    observation_label: "Calcium",
    effectiveAt: "2026-02-04T04:00:00Z",
    attributes: {
      observation_value: "9.4",
      observation_units: "mg/dL",
      status: "Normal",
    },
  },
  {
    id: 824,
    type: "lab_result",
    observation_label: "Creatinine",
    effectiveAt: "2026-02-01T03:10:00Z",
    attributes: {
      observation_value: "1.3",
      observation_units: "mg/dL",
      status: "High",
    },
  },
];

const LabsWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lab Results</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Monitor and review recent laboratory reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labResults.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
};

export default LabsWrapper;
