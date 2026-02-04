import { useTranslation } from 'react-i18next';
import { Offcanvas, Badge, ProgressBar, Button, Modal } from 'react-bootstrap';
import { X, User, Mail, Calendar, Trash2 } from 'lucide-react';
import { EClassMember, StudentAssignmentStats } from '@packages/types/EClassMember';
import { formatDate, getRelativeTime } from '@utils/Date';
import { useState } from 'react';

interface StudentOffcanvasProps {
  isOpen: boolean;
  student: EClassMember | null;
  stats: StudentAssignmentStats | null;
  onClose: () => void;
}

export function StudentOffcanvas({
  isOpen,
  student,
  stats,
  onClose,
}: StudentOffcanvasProps) {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!student || !stats) return null;

  const completionPercentage = Math.round(
    (stats.completed / stats.total) * 100
  ) || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVATED':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <Offcanvas show={isOpen} onHide={onClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t('student_detail')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="text-center mb-4">
            {student.userAvatar ? (
              <img
                src={student.userAvatar}
                alt={student.userName}
                className="rounded-circle object-fit-cover mb-3"
                width={80}
                height={80}
                loading="lazy"
              />
            ) : (
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '80px', height: '80px' }}>
                <User size={40} className="text-muted" />
              </div>
            )}
            <h5 className="mb-2">{student.userName}</h5>
            <Badge bg={getStatusColor(student.status)} className="mb-3">
              {t(`${student.status.toLowerCase()}`)}
            </Badge>
          </div>

          <div className="mb-4 pb-3 border-bottom">
            <div className="mb-3">
              <small className="text-muted d-block mb-1">
                <Mail size={14} className="me-2" style={{ verticalAlign: 'middle' }} />
                {t('email')}
              </small>
              <p className="mb-0 text-break">{student.userEmail}</p>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block mb-1">
                <Calendar size={14} className="me-2" style={{ verticalAlign: 'middle' }} />
                {t('joined_at')}
              </small>
              <p className="mb-0">{formatDate(student.joinedAt)}</p>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">{t('assignment_statistics')}</h6>

            <div className="bg-light p-3 rounded-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-muted">{t('progress')}</small>
                <strong>{completionPercentage}%</strong>
              </div>
              <ProgressBar
                now={completionPercentage}
                variant={
                  completionPercentage >= 80
                    ? 'success'
                    : completionPercentage >= 50
                      ? 'info'
                      : 'warning'
                }
              />
            </div>

            <div className="row g-2">
              <div className="col-6">
                <div className="bg-light p-3 rounded-2 text-center">
                  <p className="text-muted small mb-2">{t('total')}</p>
                  <h5 className="mb-0">{stats.total}</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-success bg-opacity-10 p-3 rounded-2 text-center">
                  <p className="text-muted small mb-2">{t('completed')}</p>
                  <h5 className="mb-0 text-success">{stats.completed}</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-warning bg-opacity-10 p-3 rounded-2 text-center">
                  <p className="text-muted small mb-2">{t('pending')}</p>
                  <h5 className="mb-0 text-warning">{stats.pending}</h5>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default StudentOffcanvas;
