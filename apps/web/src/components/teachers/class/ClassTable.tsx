import { useTranslation } from "react-i18next";
import { Eye, Settings } from "lucide-react";
import Image from "next/image";

import { EClassBase, EClassStatus } from "packages/types/EClassBase";

export default function ClassTable({ items }: { items: EClassBase[] }) {
  const { t } = useTranslation();

  if (!items.length) {
    return (
      <div className="text-center py-5 text-secondary">
        {t("no_class_found")}
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>{t("class")}</th>
            <th>{t("status")}</th>
            <th>{t("last_updated")}</th>
            <th className="text-end">{t("actions")}</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {/* Class */}
              <td>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded overflow-hidden bg-secondary-subtle"
                    style={{ width: 40, height: 40, position: "relative" }}
                  >
                    {item.avatar?.url ? (
                      <Image
                        src={item.avatar.url}
                        alt={item.displayName}
                        fill
                        className="object-fit-cover"
                      />
                    ) : (
                      <div className="h-100 w-100 d-flex align-items-center justify-content-center fw-semibold text-secondary">
                        {item.displayName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="fw-medium">
                    {item.displayName}
                  </div>
                </div>
              </td>

              {/* Status */}
              <td>
                {item.status === EClassStatus.OPEN ? (
                  <span className="badge rounded-pill text-bg-success">
                    {t("open")}
                  </span>
                ) : (
                  <span className="badge rounded-pill text-bg-secondary">
                    {t("closed")}
                  </span>
                )}
              </td>

              {/* Updated */}
              <td className="text-secondary">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>

              {/* Actions */}
              <td className="text-end">
                <button className="btn btn-sm btn-outline-secondary me-1">
                  <Eye size={16} />
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  <Settings size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
