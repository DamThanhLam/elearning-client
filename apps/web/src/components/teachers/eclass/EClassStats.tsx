import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import {
  Users,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';

interface EClassStatsProps {
  totalStudents: number;
  totalAssignments: number;
  openAssignments: number;
  upcomingAssignments: number;
}

export function EClassStats({
  totalStudents,
  totalAssignments,
  openAssignments,
  upcomingAssignments
}: EClassStatsProps) {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      label: t('total_students'),
      value: totalStudents,
      color: 'primary',
    },
    {
      icon: FileText,
      label: t('total_assignments'),
      value: totalAssignments,
      color: 'info',
    },
    {
      icon: CheckCircle,
      label: t('open_assignments'),
      value: openAssignments,
      color: 'success',
    },
    {
      icon: Clock,
      label: t('upcoming_assignments'),
      value: upcomingAssignments,
      color: upcomingAssignments > 0 ? 'warning' : 'secondary',
    },
  ];

  return (
    <div className="mb-5">
      <h5 className="mb-3">{t('eclass_stats_title')}</h5>
      <div className="row g-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-6 col-lg-3">
              <Card className="border-0 shadow-sm h-100 d-flex flex-column">
                <Card.Body className="d-flex gap-3 align-items-start">
                  <div className={`text-${stat.color}`}>
                    <Icon size={32} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="text-muted small mb-2">{stat.label}</p>
                    <h4 className="mb-0 fw-bold">{stat.value}</h4>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EClassStats;
