/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ConditionCard from "./ConditionCard";

const conditionsList = [
  {
    id: 883,
    type: "condition",
    condition_description: "Example condition",
    effectiveAt: "2026-01-30T00:00:00Z",
    attributes: {
      condition_code: "X80xxxA",
      condition_code_system: "ICD10",
      status: "Active",
    },
  },
  {
    id: 884,
    type: "condition",
    condition_description: "Hypertension",
    effectiveAt: "2026-01-25T00:00:00Z",
    attributes: {
      condition_code: "I10",
      condition_code_system: "ICD10",
      status: "Active",
    },
  },
  {
    id: 885,
    type: "condition",
    condition_description: "Type 2 Diabetes",
    effectiveAt: "2026-01-20T00:00:00Z",
    attributes: {
      condition_code: "E11",
      condition_code_system: "ICD10",
      status: "Chronic",
    },
  },
  {
    id: 886,
    type: "condition",
    condition_description: "Asthma",
    effectiveAt: "2026-01-18T00:00:00Z",
    attributes: {
      condition_code: "J45",
      condition_code_system: "ICD10",
      status: "Stable",
    },
  },
  {
    id: 887,
    type: "condition",
    condition_description: "Migraine",
    effectiveAt: "2026-01-15T00:00:00Z",
    attributes: {
      condition_code: "G43",
      condition_code_system: "ICD10",
      status: "Active",
    },
  },
  {
    id: 888,
    type: "condition",
    condition_description: "Anemia",
    effectiveAt: "2026-01-12T00:00:00Z",
    attributes: {
      condition_code: "D64",
      condition_code_system: "ICD10",
      status: "Resolved",
    },
  },
  {
    id: 889,
    type: "condition",
    condition_description: "Hypothyroidism",
    effectiveAt: "2026-01-10T00:00:00Z",
    attributes: {
      condition_code: "E03",
      condition_code_system: "ICD10",
      status: "Chronic",
    },
  },
  {
    id: 890,
    type: "condition",
    condition_description: "Arthritis",
    effectiveAt: "2026-01-08T00:00:00Z",
    attributes: {
      condition_code: "M19",
      condition_code_system: "ICD10",
      status: "Active",
    },
  },
  {
    id: 891,
    type: "condition",
    condition_description: "Depression",
    effectiveAt: "2026-01-05T00:00:00Z",
    attributes: {
      condition_code: "F32",
      condition_code_system: "ICD10",
      status: "Stable",
    },
  },
  {
    id: 892,
    type: "condition",
    condition_description: "Chronic Kidney Disease",
    effectiveAt: "2026-01-02T00:00:00Z",
    attributes: {
      condition_code: "N18",
      condition_code_system: "ICD10",
      status: "Critical",
    },
  },
];

const ConditionWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Patient Conditions
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Track and review all diagnosed medical conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {conditionsList.map((condition) => (
          <ConditionCard key={condition.id} condition={condition} />
        ))}
      </div>
    </div>
  );
};

export default ConditionWrapper;
