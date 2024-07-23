"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, ButtonGroup } from "@mui/material";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher() {
  const [lang, setLang] = useState<Locale>("en");

  useEffect(() => {
    // Load the persisted language from localStorage on component mount
    const storedLang = localStorage.getItem("preferredLanguage") as Locale;
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  function handleLangChange(locale) {
    // console.log(locale);
    setLang(locale);
    localStorage.setItem("preferredLanguage", locale);
  }
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    // console.log(segments.join("/"));
    return segments.join("/");
  };

  return (
    <ButtonGroup>
      {i18n.locales.map((locale, i) => (
        <Button
          key={locale}
          disabled={lang === locale}
          LinkComponent={Link}
          href={redirectedPathName(locale)}
          onClick={() => handleLangChange(locale)}
        >
          {locale}
        </Button>
      ))}
    </ButtonGroup>
  );
}
