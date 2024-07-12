"use client";
import React from "react";
import BookingCalendar from "../../components/BookCalendar";

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h1>Lane Reservation Calendar</h1>
      <BookingCalendar />
    </div>
  );
};

export default CalendarPage;
