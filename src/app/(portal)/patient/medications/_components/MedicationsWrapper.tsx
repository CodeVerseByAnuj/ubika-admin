"use client";

import MedicationCard from "./MedicationCard";

const medicationList = [
  {
    id: 400,
    medication_name: "calcium/ascorbate calcium",
    effectiveAt: "2025-06-30T00:00:00Z",
    attributes: {
      medication_display_text: "calcium/ascorbate calcium tab",
      prescription_status: "Active",
    },
  },
  {
    id: 401,
    medication_name: "atorvastatin",
    effectiveAt: "2025-07-01T00:00:00Z",
    attributes: {
      medication_display_text: "atorvastatin 20mg tablet",
      prescription_status: "Active",
    },
  },
  {
    id: 402,
    medication_name: "metformin",
    effectiveAt: "2025-07-02T00:00:00Z",
    attributes: {
      medication_display_text: "metformin 500mg tablet",
      prescription_status: "Active",
    },
  },
  {
    id: 403,
    medication_name: "amlodipine",
    effectiveAt: "2025-07-03T00:00:00Z",
    attributes: {
      medication_display_text: "amlodipine 5mg tablet",
      prescription_status: "Inactive",
    },
  },
  {
    id: 404,
    medication_name: "ibuprofen",
    effectiveAt: "2025-07-04T00:00:00Z",
    attributes: {
      medication_display_text: "ibuprofen 400mg capsule",
      prescription_status: "Active",
    },
  },
  {
    id: 405,
    medication_name: "paracetamol",
    effectiveAt: "2025-07-05T00:00:00Z",
    attributes: {
      medication_display_text: "paracetamol 650mg tablet",
      prescription_status: "Completed",
    },
  },
];

const MedicationsWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Patient Medications
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Track and manage all prescribed medications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicationList.map((medication) => (
          <MedicationCard key={medication.id} medication={medication} />
        ))}
      </div>
    </div>
  );
};

export default MedicationsWrapper;
