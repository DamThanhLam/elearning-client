"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search } from "lucide-react";

import { eclassApi } from "@api";
import { useRouter } from "next/navigation";
import { EClass } from "@packages/types/EClass";
import { InfiniteGridList } from "@/components/cards/InfiniteGridList";
import { EClassCard } from "@/components/cards/EClassCard";
import { onEdit, onToggleStatus, onViewDetail } from "@/styles/EClass";
import GridLayout from "@/components/layouts/GridLayout";

export default function TeacherClassesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [eclasses, setEClasses] = useState<EClass[]>([]);
  const [search, setSearch] = useState("");
  const [eclassPageToken, setEClassPageToken] = useState<any>({
    nextPageToken: undefined,
    hasNext: true,
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMoreEClasses = useCallback(async () => {
    if (loading || !eclassPageToken.hasNext) return;

    setLoading(true);
    try {
      const result = await eclassApi.getEClasses({
        displayName: search,
        nextPageToken: eclassPageToken.nextPageToken
      });
      setEClasses((prev) => [...prev, ...result.data.items]);
      setEClassPageToken({
        nextPageToken: result.data.nextPageToken,
        hasNext: result.data.hasNext,
      });
      setHasMore(result.data.hasNext);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [search, loading, eclassPageToken]);

  useEffect(() => {
    setEClasses([]);
    setEClassPageToken({ hasNext: true });
    setHasMore(true);
    setInitialLoading(true);

    loadMoreEClasses();
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
          <a href="eclass/create" className="btn btn-primary d-inline-flex align-items-center gap-2 shadow-sm mt-1 ms-3">
            <Plus size={16} />
            {t("create_class")}
          </a>
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
            placeholder={t("search_classes")}
            className="form-control ps-5"
          />
        </div>
      </div>

      <InfiniteGridList<EClass>
        items={eclasses}
        loading={loading}
        hasMore={hasMore}
        initialLoading={initialLoading}
        loadMore={loadMoreEClasses}
        layout={(items: React.ReactNode[]) => <GridLayout>{items}</GridLayout>}
        renderItem={(eclass) => (
          <EClassCard
            key={eclass.id}
            eclass={eclass}
            actions={{
              onViewDetail: onViewDetail,
              onEdit: onEdit,
              onToggleStatus: onToggleStatus,
            }}
          />
        )}
        emptyTitle={t('eclass.empty.title')}
        emptyDescription={t('eclass.empty.description')}
      />

    </div>
  );
}
