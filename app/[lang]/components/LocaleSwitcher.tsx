import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, ButtonGroup } from "@mui/material";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher({ currentLang }) {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ButtonGroup>
      {i18n.locales.map((locale, i) => (
        <Button
          key={locale}
          disabled={locale === currentLang}
          LinkComponent={Link}
          href={redirectedPathName(locale)}
        >
          {locale}
        </Button>
      ))}
    </ButtonGroup>
  );
}
