"use client";
import React, { useState } from "react";

const ReservationForm: React.FC = () => {
  const [numberOfLanes, setNumberOfLanes] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [userId, setUserId] = useState<string>(
    "41599dd3-ad30-46b1-9f96-cfbf74fbb286"
  ); // Replace with actual user ID

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/create-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfLanes, startTime, endTime, userId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Reservation created successfully!");
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Number of Lanes:</label>
        <input
          type="number"
          value={numberOfLanes}
          onChange={(e) => setNumberOfLanes(Number(e.target.value))}
          min="1"
          max="8"
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Reservation</button>
    </form>
  );
};

export default ReservationForm;
