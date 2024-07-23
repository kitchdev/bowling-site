import type { Locale } from "./i18n-config";

import enDictionary from "./dictionaries/en.json";
import frDictionary from "./dictionaries/fr.json";

const dictionaries = {
  en: enDictionary,
  fr: frDictionary,
};

export const getDictionary = (locale: Locale) =>
  dictionaries[locale] ?? dictionaries.en;
