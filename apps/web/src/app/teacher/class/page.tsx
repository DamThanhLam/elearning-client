"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";

import { eclassApi } from "@api";
import { TeacherEClass } from "packages/types/TeacherEClass";
import ClassTable from "@/components/teachers/class/ClassTable";
import ClassPagination from "@/components/Pagination";

export default function TeacherClassesPage() {
  const { t } = useTranslation();
  const [eclasses, setEClasses] = useState<TeacherEClass[]>([]);
  const [search, setSearch] = useState("");
  const [eclassPageToken, setEClassPageToken] = useState<any>({});

  const loadEClasses = async (type?: "next" | "previous") => {
    const res = await eclassApi.getEClasses({
      displayName: search,
      nextPageToken: type === "next" ? eclassPageToken.nextPageToken : undefined,
      previousPageToken: type === "previous" ? eclassPageToken.previousPageToken : undefined,
    });

    setEClasses(res.data.items);
    setEClassPageToken(res.data);
  };

  useEffect(() => {
    loadEClasses();
  }, [search]);

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex align-items-start mb-4">
        <div>
          <h1 className="h4 fw-semibold mb-1">
            {t("class_management")}
          </h1>
          <p className="text-secondary small mb-0">
            {t("class_management_description")}
          </p>
        </div>
          <button className="btn btn-primary d-inline-flex align-items-center gap-2 shadow-sm mt-1 ms-3">
          <Plus size={16} />
          {t("create_class")}
        </button>
      </div>

      {/* Toolbar */}
      <div className="row mb-4">
        <div className="col-12 col-md-4 position-relative">
          <Search
            size={16}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search_class")}
            className="form-control ps-5"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <ClassTable items={eclasses} />
        </div>
      </div>

      {/* Pagination */}
      <ClassPagination
        hasNext={eclassPageToken.hasNext}
        hasPrevious={eclassPageToken.hasPrevious}
        onNext={() => loadEClasses("next")}
        onPrevious={() => loadEClasses("previous")}
      />
    </div>
  );
}
