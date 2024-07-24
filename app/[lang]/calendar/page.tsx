import React from "react";
import { getServerSession } from "next-auth";
import BookingCalendar from "@/app/[lang]/components/BookCalendar";
import Login from "@/app/[lang]/components/Login";

const CalendarPage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <h1>Lane Reservation Calendar</h1>
      <BookingCalendar />
    </div>
  );
};

export default CalendarPage;
