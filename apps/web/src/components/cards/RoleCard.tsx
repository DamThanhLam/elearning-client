
function RoleCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
   <div className="col-md-6">
      <div
        className="card h-100 shadow-sm border-0 role-card"
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <div className="card-body">
          <div className="mb-3 text-primary">
            <i className={`bi ${icon}`} style={{ fontSize: 48 }} />
          </div>

          <h5 className="fw-semibold">{title}</h5>
          <p className="text-body-secondary mb-4">{description}</p>

          <div className="fw-medium text-primary">
            {title} →
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoleCard;