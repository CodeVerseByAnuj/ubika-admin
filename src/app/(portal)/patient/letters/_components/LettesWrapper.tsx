/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LetterCard from "./LetterCard";

const lettersList = [
  {
    id: 134,
    type: "letter",
    title: "Demo Letter for Chester Tester",
    content: "Letter body example.",
    effectiveAt: "2025-08-22T03:11:26Z",
    attributes: {
      letter_status: "Active",
      read_status: "Unread",
    },
  },
  {
    id: 135,
    type: "letter",
    title: "Follow-up Consultation Letter",
    content: "Patient follow-up consultation details.",
    effectiveAt: "2025-08-23T10:20:00Z",
    attributes: {
      letter_status: "Active",
      read_status: "Read",
    },
  },
  {
    id: 136,
    type: "letter",
    title: "Lab Report Notification",
    content: "Your recent lab reports are available.",
    effectiveAt: "2025-08-24T08:30:00Z",
    attributes: {
      letter_status: "Archived",
      read_status: "Unread",
    },
  },
  {
    id: 137,
    type: "letter",
    title: "Prescription Renewal",
    content: "Prescription renewal approval letter.",
    effectiveAt: "2025-08-25T11:15:00Z",
    attributes: {
      letter_status: "Active",
      read_status: "Read",
    },
  },
  {
    id: 138,
    type: "letter",
    title: "Appointment Reminder",
    content: "Reminder for your upcoming appointment.",
    effectiveAt: "2025-08-26T09:45:00Z",
    attributes: {
      letter_status: "Active",
      read_status: "Unread",
    },
  },
  {
    id: 139,
    type: "letter",
    title: "Vaccination Confirmation",
    content: "Vaccination successfully completed.",
    effectiveAt: "2025-08-27T01:00:00Z",
    attributes: {
      letter_status: "Completed",
      read_status: "Read",
    },
  },
  {
    id: 140,
    type: "letter",
    title: "Insurance Verification",
    content: "Insurance verification completed.",
    effectiveAt: "2025-08-28T04:25:00Z",
    attributes: {
      letter_status: "Pending",
      read_status: "Unread",
    },
  },
  {
    id: 141,
    type: "letter",
    title: "Specialist Referral",
    content: "Referral to cardiology specialist.",
    effectiveAt: "2025-08-29T06:40:00Z",
    attributes: {
      letter_status: "Active",
      read_status: "Read",
    },
  },
  {
    id: 142,
    type: "letter",
    title: "Discharge Summary",
    content: "Hospital discharge summary attached.",
    effectiveAt: "2025-08-30T02:10:00Z",
    attributes: {
      letter_status: "Completed",
      read_status: "Unread",
    },
  },
  {
    id: 143,
    type: "letter",
    title: "Annual Health Check",
    content: "Invitation for annual health checkup.",
    effectiveAt: "2025-08-31T12:00:00Z",
    attributes: {
      letter_status: "Active",
      read_status: "Read",
    },
  },
];

const LettesWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Letters</h1>

        <p className="text-sm text-muted-foreground mt-1">
          Review and manage all medical letters and notices.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lettersList.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
};

export default LettesWrapper;
