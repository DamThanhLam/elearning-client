import { useTranslation } from 'react-i18next';
import { ListGroup, Badge } from 'react-bootstrap';
import { User } from 'lucide-react';
import { getRelativeTime } from '@utils/Date';
import { EClassMember, EClassMemberStatus } from '@packages/types/EClassMember';

interface StudentItemProps {
  student: EClassMember;
  onClick: (student: EClassMember) => void;
}

export function StudentItem({ student, onClick }: StudentItemProps) {
  const { t } = useTranslation();

  const getStatusVariant = (status: EClassMemberStatus) => {
    switch (status) {
      case EClassMemberStatus.ACTIVATED:
        return 'success';
    }
  };

  return (
    <ListGroup.Item
      action
      onClick={() => onClick(student)}
      className="d-flex gap-3 align-items-center py-3 hover-bg-light transition-all"
    >
      {student.userAvatar ? (
        <img
          src={student.userAvatar}
          alt={student.userName}
          className="rounded-circle object-fit-cover"
          width={48}
          height={48}
          loading="lazy"
        />
      ) : (
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
          <User size={24} className="text-muted" />
        </div>
      )}

      <div className="flex-grow-1">
        <h6 className="mb-1">{student.userName}</h6>
        <small className="text-muted d-block mb-2">{student.userEmail}</small>
        <small className="text-muted">
          {t('student.joinedAt')}: {getRelativeTime(student.joinedAt)}
        </small>
      </div>

      <Badge
        bg={getStatusVariant(student.status)}
        className="text-uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.5px' }}
      >
        {t(`student.status.${student.status.toLowerCase()}`)}
      </Badge>
    </ListGroup.Item>
  );
}

export default StudentItem;
