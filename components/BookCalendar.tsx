"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Slot = {
  slot_start: string;
  slot_end: string;
};

const BookingCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (date) {
        const response = await fetch(
          `/api/available-slots?date=${
            date.toISOString().split("T")[0]
          }&noLanes=2`
        );
        const { result } = await response.json();
        setSlots(result);
      }
    };

    fetchSlots();
  }, [date]);

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <div>
        {slots.map((slot) => (
          <div key={slot.slot_start}>
            {new Date(slot.slot_start).toLocaleTimeString()} -{" "}
            {new Date(slot.slot_end).toLocaleTimeString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;
