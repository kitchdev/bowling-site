"use client";
import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material";
import { useState } from "react";
import SignOut from "@/app/[lang]/components/SignOut";
import Logo from "@/app/[lang]/components/Logo";
import LocaleSwitcher from "@/app/[lang]/components/LocaleSwitcher";

export default function AppBar({ session }: { session?: any }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transitions: "ease-in-out 0.2s",
          backgroundColor: "white",
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Logo width={96} height={96} />
          </Box>
          <Box paddingRight={2}>
            <LocaleSwitcher />
          </Box>
          <Box>{session && <SignOut />}</Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
