"use client";

import HistoryCard from "./HistoryCard";

const historyList = [
  {
    id: 547,
    type: "clinical_history",
    history_description: "Generated using Demo Data Generator",
    effectiveAt: "2026-02-26T14:36:25Z",
    attributes: {
      history_type: "REGULAR",
      details: null,
      note: null,
      treatment: null,
    },
  },
  {
    id: 548,
    type: "clinical_history",
    history_description: "Routine annual health check completed",
    effectiveAt: "2026-02-24T10:20:00Z",
    attributes: {
      history_type: "ANNUAL",
      details: "General wellness evaluation",
      note: "Vitals stable",
      treatment: null,
    },
  },
  {
    id: 549,
    type: "clinical_history",
    history_description: "Blood pressure monitoring",
    effectiveAt: "2026-02-22T09:00:00Z",
    attributes: {
      history_type: "FOLLOW_UP",
      details: "BP slightly elevated",
      note: "Continue monitoring",
      treatment: "Lifestyle changes",
    },
  },
  {
    id: 550,
    type: "clinical_history",
    history_description: "Diabetes management review",
    effectiveAt: "2026-02-20T08:30:00Z",
    attributes: {
      history_type: "REGULAR",
      details: "Blood sugar controlled",
      note: "Medication effective",
      treatment: "Metformin",
    },
  },
  {
    id: 551,
    type: "clinical_history",
    history_description: "Asthma follow-up visit",
    effectiveAt: "2026-02-18T12:15:00Z",
    attributes: {
      history_type: "FOLLOW_UP",
      details: "Breathing improved",
      note: "No recent attacks",
      treatment: "Inhaler therapy",
    },
  },
  {
    id: 552,
    type: "clinical_history",
    history_description: "Vaccination administered",
    effectiveAt: "2026-02-16T11:45:00Z",
    attributes: {
      history_type: "IMMUNIZATION",
      details: "Influenza vaccine",
      note: "No side effects",
      treatment: null,
    },
  },
  {
    id: 553,
    type: "clinical_history",
    history_description: "Orthopedic consultation",
    effectiveAt: "2026-02-14T02:00:00Z",
    attributes: {
      history_type: "SPECIALIST",
      details: "Knee pain assessment",
      note: "Recommended physiotherapy",
      treatment: "Physical therapy",
    },
  },
  {
    id: 554,
    type: "clinical_history",
    history_description: "Mental health counseling session",
    effectiveAt: "2026-02-12T04:30:00Z",
    attributes: {
      history_type: "COUNSELING",
      details: "Stress management",
      note: "Positive progress",
      treatment: "Therapy sessions",
    },
  },
  {
    id: 555,
    type: "clinical_history",
    history_description: "Skin allergy treatment",
    effectiveAt: "2026-02-10T01:10:00Z",
    attributes: {
      history_type: "REGULAR",
      details: "Mild allergic reaction",
      note: "Prescribed ointment",
      treatment: "Topical cream",
    },
  },
  {
    id: 556,
    type: "clinical_history",
    history_description: "Cardiology consultation",
    effectiveAt: "2026-02-08T03:25:00Z",
    attributes: {
      history_type: "SPECIALIST",
      details: "ECG review normal",
      note: "No abnormalities found",
      treatment: null,
    },
  },
];

const HistoryWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient History</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review complete patient medical and treatment history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {historyList.map((history) => (
          <HistoryCard key={history.id} history={history} />
        ))}
      </div>
    </div>
  );
};

export default HistoryWrapper;
