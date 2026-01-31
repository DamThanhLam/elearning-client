export default function ClassPagination({
  hasNext,
  hasPrevious,
  onNext,
  onPrevious
}: any) {
  return (
    <div className="d-flex justify-content-center gap-2 mt-4">
      {hasPrevious && (
        <button onClick={onPrevious} className="btn btn-outline-secondary">
          ←
        </button>
      )}
      {hasNext && (
        <button onClick={onNext} className="btn btn-outline-secondary">
          →
        </button>
      )}
    </div>
  );
}
