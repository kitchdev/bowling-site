import { useState } from "react";
import { getServerSession } from "next-auth";
import { Box, Typography } from "@mui/material";
import Login from "@/app/[lang]/components/Login";
import HomePage from "@/app/[lang]/components/HomePage";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession();
  const dictionary = await getDictionary(lang);
  console.log(lang);

  if (!session) {
    return <Login />;
  }
  return (
    <>
      <HomePage locale={lang} />
    </>
  );
}
