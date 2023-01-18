import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en/translations.json";
import uk from "@/locales/uk/translations.json";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translation: en,
    },
    uk: {
      translation: uk,
    },
  },
  fallbackLng: "uk",
  debug: true,
});

export const t = (key: keyof typeof en | keyof typeof uk): string => {
  return i18n.t(key);
};
