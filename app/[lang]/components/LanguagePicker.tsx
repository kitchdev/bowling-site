import { Button, ButtonGroup } from "@mui/material";

export default function LanguagePicker({
  language,
  handleChange,
}: {
  language: "en" | "fr";
  handleChange: (language: "en" | "fr") => void;
}) {
  return (
    <ButtonGroup>
      {["en", "fr"].map((lang) => (
        <Button
          key={lang}
          disabled={language === lang}
          onClick={() => handleChange(lang as "en" | "fr")}
        >
          {lang}
        </Button>
      ))}
    </ButtonGroup>
  );
}
