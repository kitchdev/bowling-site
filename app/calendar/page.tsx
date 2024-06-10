// app/calendar/page.tsx
import React from "react";
import BookingCalendar from "../../components/BookCalendar";

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h1>Booking Calendar</h1>
      <BookingCalendar />
    </div>
  );
};

export default CalendarPage;
