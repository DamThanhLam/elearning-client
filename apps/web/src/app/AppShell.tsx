'use client';

import { useUser } from "@hooks";
import useTheme from "@hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AppShell({children}:{children: React.ReactNode}) {
    const { getUserInformation } = useUser();
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [language, setLang] = useState("en");

    //load user information
    useEffect(() => {
        getUserInformation();
    }, []);

    //load language system
     useEffect(() => {
        setLang(localStorage.getItem("lang") || i18n.language || "en");
    }, []);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);
    return (
        <html data-bs-theme={theme}>
        <body>
            <div className="position-fixed top-0 end-0 m-3 d-flex align-items-center gap-2 z-1030">
                {/* Theme toggle */}
                <button
                    aria-label={theme === "dark" ? t("theme.light") : t("theme.dark")}
                    onClick={toggleTheme}
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center theme-toggle"
                >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Language dropdown */}
                <select
                    value={language}
                    onChange={(e) => setLang(e.target.value)}
                    className="form-select form-select-sm lang-select"
                >
                    <option value="vi">🇻🇳 Tiếng Việt</option>
                    <option value="en">🇺🇸 English</option>
                </select>
            </div>
            {children}
        </body>
        </html>
    );
}