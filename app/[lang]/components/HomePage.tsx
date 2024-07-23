"use client";
import { Box, Typography } from "@mui/material";
import { getDictionary } from "@/get-dictionaries";

export default function HomePage({ locale }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <Box>
        <Typography>{dictionary["server-component"].welcome}</Typography>
      </Box>
    </>
  );
}
