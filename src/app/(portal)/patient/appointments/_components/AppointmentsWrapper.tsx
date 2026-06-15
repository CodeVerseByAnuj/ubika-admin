"use client";

import AppointmentCard from "./AppointmentCard";

const appointmentList = [
  {
    id: 1,
    doctor: "Dr. Chen",
    specialization: "Cardiology",
    hospital: "Trillium Health",
    date: "Apr 28",
    time: "2:00 PM",
  },
  {
    id: 2,
    doctor: "Dr. Smith",
    specialization: "Dermatology",
    hospital: "City Care",
    date: "May 02",
    time: "11:30 AM",
  },
  {
    id: 3,
    doctor: "Dr. Williams",
    specialization: "Neurology",
    hospital: "Metro Hospital",
    date: "May 05",
    time: "9:00 AM",
  },
  {
    id: 4,
    doctor: "Dr. Brown",
    specialization: "Orthopedic",
    hospital: "Apollo Clinic",
    date: "May 07",
    time: "4:00 PM",
  },
  {
    id: 5,
    doctor: "Dr. Taylor",
    specialization: "ENT",
    hospital: "Sunrise Health",
    date: "May 10",
    time: "1:15 PM",
  },
  {
    id: 6,
    doctor: "Dr. Wilson",
    specialization: "Pediatrics",
    hospital: "Kids Care",
    date: "May 12",
    time: "3:45 PM",
  },
  {
    id: 7,
    doctor: "Dr. Johnson",
    specialization: "Dentist",
    hospital: "Smile Dental",
    date: "May 14",
    time: "10:00 AM",
  },
  {
    id: 8,
    doctor: "Dr. Davis",
    specialization: "Eye Specialist",
    hospital: "Vision Plus",
    date: "May 16",
    time: "12:30 PM",
  },
  {
    id: 9,
    doctor: "Dr. Lee",
    specialization: "Psychiatrist",
    hospital: "Mind Wellness",
    date: "May 18",
    time: "5:00 PM",
  },
  {
    id: 10,
    doctor: "Dr. White",
    specialization: "General Physician",
    hospital: "Care Hospital",
    date: "May 20",
    time: "8:30 AM",
  },
  {
    id: 11,
    doctor: "Dr. Hall",
    specialization: "Gynecologist",
    hospital: "Women's Clinic",
    date: "May 21",
    time: "2:20 PM",
  },
  {
    id: 12,
    doctor: "Dr. Young",
    specialization: "Urologist",
    hospital: "Health First",
    date: "May 22",
    time: "6:00 PM",
  },
  {
    id: 13,
    doctor: "Dr. Allen",
    specialization: "Cardiology",
    hospital: "Heart Center",
    date: "May 24",
    time: "1:00 PM",
  },
  {
    id: 14,
    doctor: "Dr. King",
    specialization: "Oncology",
    hospital: "Cancer Care",
    date: "May 25",
    time: "9:40 AM",
  },
  {
    id: 15,
    doctor: "Dr. Scott",
    specialization: "Physiotherapy",
    hospital: "Recovery Hub",
    date: "May 26",
    time: "7:15 PM",
  },
  {
    id: 16,
    doctor: "Dr. Green",
    specialization: "Radiology",
    hospital: "Scan Center",
    date: "May 27",
    time: "11:10 AM",
  },
  {
    id: 17,
    doctor: "Dr. Adams",
    specialization: "Pulmonology",
    hospital: "Lung Care",
    date: "May 28",
    time: "3:00 PM",
  },
  {
    id: 18,
    doctor: "Dr. Baker",
    specialization: "Nephrology",
    hospital: "Kidney Clinic",
    date: "May 29",
    time: "4:45 PM",
  },
  {
    id: 19,
    doctor: "Dr. Carter",
    specialization: "Diabetology",
    hospital: "Sugar Care",
    date: "May 30",
    time: "10:50 AM",
  },
  {
    id: 20,
    doctor: "Dr. Evans",
    specialization: "Skin Specialist",
    hospital: "Glow Clinic",
    date: "Jun 01",
    time: "12:00 PM",
  },
];

const AppointmentsWrapper = () => {
  return (
    <div className="w-full space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Patient Appointments
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Manage and track all upcoming patient appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointmentList.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>

      <div className="py-4">
        <div>Pagination</div>
      </div>
    </div>
  );
};

export default AppointmentsWrapper;
