import React from "react";
import { getServerSession } from "next-auth";
import BookingCalendar from "@/app/[lang]/components/BookCalendar";
import Login from "@/app/[lang]/components/Login";
import { Locale } from "@/i18n-config";

const CalendarPage: React.FC = async ({
  params,
}: {
  params: { lang: Locale };
}) => {
  const session = await getServerSession();
  if (!session) {
    return <Login />;
  }
  return (
    <>
      <BookingCalendar lang={params.lang} />
    </>
  );
};

export default CalendarPage;
