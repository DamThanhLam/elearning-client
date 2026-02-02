import { useTranslation } from 'react-i18next';
import { Users, FileText, MoreVertical } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';
import { EClass, EClassCardActions, EClassStatus } from 'packages/types/EClass';
import useTheme from '@hooks/useTheme';
import formatDate from '@utils/Date';

interface EClassCardProps {
  eclass: EClass;
  actions: EClassCardActions;
}

export function EClassCard({ eclass, actions }: EClassCardProps) {
  const { t } = useTranslation();
  const { theme } = useTheme(); // 'light' | 'dark'

  const statusBadgeClass =
    eclass.status === EClassStatus.OPEN ? 'bg-success' : 'bg-secondary';

  return (
    <div className="col" data-bs-theme={theme}>
      <div
        className="card h-100 border shadow-sm bg-body text-body"
        style={{
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <div className="card-body d-flex flex-column">
          {/* Header */}
          <div className="d-flex align-items-start gap-3 mb-3">
            <img
              src={eclass.avatar.url}
              alt={eclass.displayName}
              className="rounded"
              width={60}
              height={60}
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title mb-1 text-truncate">
                  {eclass.displayName}
                </h5>

                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="p-0 border-0 text-body"
                    style={{ boxShadow: 'none' }}
                    aria-label={t('more_options')}
                  >
                    <MoreVertical size={20} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => actions.onViewDetail(eclass)}>
                      {t('view_detail')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => actions.onEdit(eclass)}>
                      {t('edit')}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => actions.onToggleStatus(eclass)}
                    >
                      {eclass.status === EClassStatus.OPEN
                        ? t('closed')
                        : t('open')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <span className={`badge ${statusBadgeClass}`}>
                {t(`${eclass.status.toLowerCase()}`)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="card-text text-body-secondary mb-3"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {eclass.shortDescription}
          </p>

          {/* Footer */}
          <div className="mt-auto">
            <div className="d-flex gap-3 mb-2">
              <div className="d-flex align-items-center gap-1">
                <Users size={16} className="text-primary" />
                <small className="text-body-secondary">
                  {eclass.students} {t('students')}
                </small>
              </div>

              <div className="d-flex align-items-center gap-1">
                <FileText size={16} className="text-primary" />
                <small className="text-body-secondary">
                  {eclass.assignments} {t('assignments')}
                </small>
              </div>
            </div>

            <small className="text-body-secondary">
              {t('updated_at')}: {formatDate(eclass.updatedAt)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
