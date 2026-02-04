import { useEffect, useRef } from "react";
import { SkeletonGrid } from "./SkeletonGrid";

interface InfiniteGridListProps<T> {
  items: T[];
  loading: boolean;
  initialLoading: boolean;
  loadMore: () => void;
  hasMore: boolean;
  layout: any;
  renderItem: (item: T) => React.ReactNode;
  skeletonCount?: number;
  emptyTitle: string;
  emptyDescription: string;
}

export function InfiniteGridList<T>({
  items,
  loading,
  initialLoading,
  loadMore,
  hasMore,
  layout,
  renderItem,
  skeletonCount = 6,
  emptyTitle,
  emptyDescription,
}: InfiniteGridListProps<T>) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { threshold: 0.1 }
    );

    observerTarget.current && observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore]);

  if (initialLoading) {
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <SkeletonGrid count={skeletonCount} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>{emptyTitle}</h3>
        <p className="text-muted">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <>
      {layout(items.map(renderItem))}

      <div ref={observerTarget} className="py-4 text-center">
        {loading && <div className="spinner-border" />}
        {!hasMore && <p className="text-muted">No more data</p>}
      </div>
    </>
  );
}
