import React from "react";
import { getServerSession } from "next-auth";
import BookingCalendar from "@/app/[lang]/components/BookCalendar";
import Login2 from "@/app/[lang]/components/Login2";

const CalendarPage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) {
    return <Login2 />;
  }
  return (
    <>
      <BookingCalendar />
    </>
  );
};

export default CalendarPage;
