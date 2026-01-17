import i18n from "@/i18n/index";
import { useEffect, useState } from "react";

export const useLanguage = (value: string) => {
    const [lang, setLang] = useState(i18n.language || "en");
    useEffect(() => {
        setLang(value);
        changeLanguage(value);
    }, [value]);
    const changeLanguage = async (lng: string) => {
        try {
            await i18n.changeLanguage(lng);
            setLang(lng);
        } catch (err) {
            console.warn("changeLanguage error", err);
        }
    };
    return lang;
}
