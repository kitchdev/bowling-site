"use client";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SignOut from "@/app/[lang]/components/SignOut";
import Logo from "@/app/[lang]/components/Logo";
import { Locale } from "@/i18n-config";
import LocaleSwitcher from "@/app/[lang]/components/LocaleSwitcher";
import { getDictionary } from "@/get-dictionaries";

export default function AppBar({
  lang,
  session,
}: {
  lang: Locale;
  session?: any;
}) {
  const dictionary = getDictionary(lang);
  const pathName = usePathname();
  const segments = pathName.split("/");
  const currentPage = segments[2];
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
            <Button disabled={!currentPage} href="/">
              {dictionary["appBar"].home}
            </Button>
          </Box>
          <Box paddingRight={2}>
            <Button disabled={currentPage === "calendar"} href="/calendar">
              {dictionary["appBar"].reserve}
            </Button>
          </Box>
          <Box paddingRight={2}>
            <IconButton disabled={currentPage === "profile"} href="/profile">
              <ManageAccountsIcon />
            </IconButton>
          </Box>
          <Box paddingRight={2}>
            <LocaleSwitcher currentLang={lang} />
          </Box>
          <Box>{session && <SignOut />}</Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
