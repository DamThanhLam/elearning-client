import { useTranslation } from 'react-i18next';
import { Card, Badge, Button, Dropdown } from 'react-bootstrap';
import { MoreVertical, AlertCircle, Calendar } from 'lucide-react';
import { Assignment, AssignmentActions, AssignmentStatus } from '@packages/types/Assignment';
import { formatDate, formatDateTime, getDaysUntil, isDueSoon } from '@utils/Date';

interface AssignmentItemProps {
  assignment: Assignment;
  actions: AssignmentActions | null;
  onViewDetail: (id: string) => void;
}

export function AssignmentItem({
  assignment,
  onViewDetail,
  actions
}: AssignmentItemProps) {
  const { t } = useTranslation();

  const isOpen = assignment.status === AssignmentStatus.OPEN;
  const daysUntilDue = getDaysUntil(assignment.dueAt);
  const isDueSoonFlag = isDueSoon(assignment.dueAt);
  const isOverdue = daysUntilDue < 0;

  return (
    <Card className="border-0 shadow-sm mb-3 hover-lift transition-all">
      <Card.Body>
        <div className="row align-items-start g-3">
          <div onClick={() => onViewDetail(assignment.id)} className="col-md-7">
            <div className="d-flex gap-2 align-items-start mb-2">
              <Badge
                bg={isOpen ? 'primary' : 'secondary'}
                className="mt-1"
              >
                {t(`${isOpen ? 'open' : 'closed'}`)}
              </Badge>
              <Badge bg="light" text="dark" className="mt-1">
                {t(`${assignment.type.toLowerCase()}`)}
              </Badge>
              {isDueSoonFlag && (
                <Badge bg="warning" className="mt-1 d-flex align-items-center gap-1">
                  <AlertCircle size={12} />
                  {t('loading')}
                </Badge>
              )}
            </div>

            <h6 className="mb-2 fw-bold">{assignment.displayName}</h6>
            <p className="text-muted small mb-3 line-clamp-2">
              {assignment.shortDescription}
            </p>

            <div className="d-flex flex-wrap gap-3 text-muted">
              <small className="d-flex align-items-center gap-1">
                <Calendar size={14} />
                {t('start_at')}: {formatDateTime(assignment.startAt)}
              </small>
              <small className={`d-flex align-items-center gap-1 ${isDueSoonFlag || isOverdue ? 'text-danger' : ''}`}>
                <Calendar size={14} />
                {t('due_at')}: {formatDateTime(assignment.dueAt)}
                {daysUntilDue >= 0 && ` (${daysUntilDue}d)`}
                {isOverdue && ' (OVERDUE)'}
              </small>
            </div>
          </div>

          <div className="col-md-5">
            <div className="text-end">
              {actions && <Dropdown align="end">
                <Dropdown.Toggle
                  as={Button}
                  variant="ghost"
                  className="btn-sm p-2"
                  id={`assignment-menu-${assignment.id}`}
                >
                  <MoreVertical size={18} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => actions.onEdit(assignment)}>
                    {t('edit')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => actions.onToggleStatus(assignment)}>
                    {t('toggle_status')}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </Dropdown.Menu>
              </Dropdown>}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AssignmentItem;
