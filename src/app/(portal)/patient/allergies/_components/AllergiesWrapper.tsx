"use client";

import AllergieCard from "./AllergieCard";

const allergiesList = [
  {
    id: 1304,
    type: "allergy_intolerance",
    allergy_name: "ATGAM 50 MG/ML AMPUL",
    effectiveAt: "2026-02-14T00:00:00Z",
    attributes: {
      clinical_status: "Suspect",
      reaction_description: "Rash",
    },
  },
  {
    id: 1305,
    type: "allergy_intolerance",
    allergy_name: "Penicillin",
    effectiveAt: "2026-02-12T00:00:00Z",
    attributes: {
      clinical_status: "Confirmed",
      reaction_description: "Swelling",
    },
  },
  {
    id: 1306,
    type: "allergy_intolerance",
    allergy_name: "Peanuts",
    effectiveAt: "2026-02-10T00:00:00Z",
    attributes: {
      clinical_status: "Active",
      reaction_description: "Difficulty breathing",
    },
  },
  {
    id: 1307,
    type: "allergy_intolerance",
    allergy_name: "Dust Mites",
    effectiveAt: "2026-02-08T00:00:00Z",
    attributes: {
      clinical_status: "Mild",
      reaction_description: "Sneezing",
    },
  },
  {
    id: 1308,
    type: "allergy_intolerance",
    allergy_name: "Shellfish",
    effectiveAt: "2026-02-06T00:00:00Z",
    attributes: {
      clinical_status: "Confirmed",
      reaction_description: "Hives",
    },
  },
  {
    id: 1309,
    type: "allergy_intolerance",
    allergy_name: "Latex",
    effectiveAt: "2026-02-04T00:00:00Z",
    attributes: {
      clinical_status: "Active",
      reaction_description: "Skin irritation",
    },
  },
  {
    id: 1310,
    type: "allergy_intolerance",
    allergy_name: "Milk",
    effectiveAt: "2026-02-02T00:00:00Z",
    attributes: {
      clinical_status: "Resolved",
      reaction_description: "Stomach pain",
    },
  },
  {
    id: 1311,
    type: "allergy_intolerance",
    allergy_name: "Ibuprofen",
    effectiveAt: "2026-01-30T00:00:00Z",
    attributes: {
      clinical_status: "Suspect",
      reaction_description: "Nausea",
    },
  },
  {
    id: 1312,
    type: "allergy_intolerance",
    allergy_name: "Eggs",
    effectiveAt: "2026-01-28T00:00:00Z",
    attributes: {
      clinical_status: "Confirmed",
      reaction_description: "Itching",
    },
  },
  {
    id: 1313,
    type: "allergy_intolerance",
    allergy_name: "Pollen",
    effectiveAt: "2026-01-26T00:00:00Z",
    attributes: {
      clinical_status: "Mild",
      reaction_description: "Runny nose",
    },
  },
];

const AllergiesWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Allergies</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review patient allergy records and reactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allergiesList.map((allergy) => (
          <AllergieCard key={allergy.id} allergy={allergy} />
        ))}
      </div>
    </div>
  );
};

export default AllergiesWrapper;
