'use client';
import "@/i18n";

import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@store";
import useTheme from "@hooks/useTheme";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || i18n.language || "en";
    }
    return "en";
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <html data-bs-theme={theme}>
      <body>
        <div className="position-absolute top-0 end-0 m-3 d-flex align-items-center gap-2">
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

        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
