import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

const fallbackLanguage = "en";

const languageDetector = {
  type: "languageDetector" as const,
  async: false,

  detect: () => {
    if (typeof window === "undefined") {
      return fallbackLanguage;
    }

    const savedLang = window.localStorage.getItem("lang");
    if (savedLang) return savedLang;

    const browserLang = navigator.language?.split("-")[0];
    return browserLang || fallbackLanguage;
  },

  cacheUserLanguage: (lng: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lng);
    }
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: fallbackLanguage,
    defaultNS: "translation",
    ns: ["translation"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18next;
