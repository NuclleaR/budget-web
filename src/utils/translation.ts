import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "virtual:i18next-loader";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translation: resources.en,
    },
    uk: {
      translation: resources.uk,
    },
  },
  fallbackLng: "uk",
  debug: true,
});

export const t = (key: string): string => {
  return i18n.t(key);
};
