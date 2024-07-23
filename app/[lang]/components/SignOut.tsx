"use client";
import { ExitToAppSharp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <IconButton onClick={() => signOut()}>
      <ExitToAppSharp />
    </IconButton>
  );
}
