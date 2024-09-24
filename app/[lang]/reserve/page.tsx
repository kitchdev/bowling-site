// app/reserve/page.tsx
import React from "react";
import ReservationForm from "../components/ReservationForm";

const ReservePage: React.FC = ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  return (
    <div>
      <h1>Reserve a Lane</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservePage;
