import { CardSkeleton } from "./CardSkeleton";

interface SkeletonGridProps {
  count?: number;
  renderItem?: (index: number) => React.ReactNode;
}

export function SkeletonGrid({
  count = 6,
  renderItem,
}: SkeletonGridProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) =>
        renderItem ? renderItem(index) : <CardSkeleton key={index} />
      )}
    </>
  );
}
