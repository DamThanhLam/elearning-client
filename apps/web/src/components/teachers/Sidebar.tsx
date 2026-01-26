"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

type Props = {
  notificationCount?: number;
};

export default function TeacherSidebar({ notificationCount = 0 }: Props) {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const navLinkClass = (href: string) =>
    clsx(
      "nav-link d-flex align-items-center gap-2 rounded px-3 py-2",
      pathname.startsWith(href) && "active fw-semibold bg-primary-subtle text-primary"
    );

  return (
    <aside
      className="d-flex flex-column flex-shrink-0 border-end vh-100"
      style={{ width: 260 }}
    >
      {/* Header */}
      <div className="d-flex align-items-center gap-3 p-3 border-bottom">
        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
             style={{ width: 44, height: 44 }}>
          <i className="bi bi-book fs-4" />
        </div>
        <div>
          <div className="fw-semibold">{t("brand_name")}</div>
          <small className="text-muted">{t("teacher")}</small>
        </div>
      </div>

      {/* Navigation */}
      <ul className="nav nav-pills flex-column gap-1 p-2">
        <li className="nav-item">
          <Link href="/teacher/dashboard" className={navLinkClass("/teacher/dashboard")}>
            <i className="bi bi-house fs-5" />
            {t("home")}
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/teacher/class" className={navLinkClass("/teacher/class")}>
            <i className="bi bi-journal-bookmark fs-5" />
            {t("classes")}
          </Link>
        </li>

        <li className="nav-item">
          <Link
            href="/teacher/notification"
            className={navLinkClass("/teacher/notification")}
          >
            <i className="bi bi-bell fs-5 position-relative">
              {notificationCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notificationCount}
                </span>
              )}
            </i>
            {t("notifications")}
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/teacher/setting" className={navLinkClass("/teacher/setting")}>
            <i className="bi bi-gear fs-5" />
            {t("settings")}
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className="mt-auto p-3 border-top">
        <Link
          href="/logout"
          className="nav-link d-flex align-items-center gap-2 text-danger px-3"
        >
          <i className="bi bi-box-arrow-right fs-5" />
          {t("logout")}
        </Link>
      </div>
    </aside>
  );
}
