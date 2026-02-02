interface CardSkeletonProps {
  avatarSize?: number;
}

export function CardSkeleton({ avatarSize = 60 }: CardSkeletonProps) {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex align-items-start gap-3 mb-3">
            <div
              className="bg-secondary rounded placeholder-glow"
              style={{ width: avatarSize, height: avatarSize }}
            >
              <span className="placeholder col-12 h-100" />
            </div>

            <div className="flex-grow-1 placeholder-glow">
              <span className="placeholder col-8 mb-2" />
              <span className="placeholder col-4" />
            </div>
          </div>

          {/* Description */}
          <div className="placeholder-glow mb-3">
            <span className="placeholder col-12 mb-1" />
            <span className="placeholder col-10" />
          </div>

          {/* Meta */}
          <div className="d-flex gap-2 mb-2 placeholder-glow">
            <span className="placeholder col-4" />
            <span className="placeholder col-4" />
          </div>

          {/* Footer */}
          <div className="placeholder-glow">
            <span className="placeholder col-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
