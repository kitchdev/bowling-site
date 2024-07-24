import { useState } from "react";
import { getServerSession } from "next-auth";
import { Box, Typography } from "@mui/material";
import Login from "@/app/[lang]/components/Login";
import Login2 from "@/app/[lang]/components/Login2";
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

  if (!session) {
    return <Login2 />;
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box>
          <Typography>{dictionary["homePage"].welcome}</Typography>
        </Box>
      </Box>
    </>
  );
}
