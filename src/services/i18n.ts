import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "src/translate/en-US.json";

export const defaultLng = "en";

export const resources = {
  en: {
    translation: en,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLng,
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;

export const activeLanguage = i18n.language;
