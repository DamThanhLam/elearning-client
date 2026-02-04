import { useTranslation } from 'react-i18next';
import { Button, Badge } from 'react-bootstrap';
import { Edit, Lock, Unlock } from 'lucide-react';
import { EClass, EClassStatus } from '@packages/types/EClass';
import { formatDate, formatDateTime } from '@utils/Date';
import { useModalNotification } from '@hooks';
import { eclassApi } from '@api';
import { useState } from 'react';

interface EClassHeaderProps {
  eclass: EClass | null;
  onEdit: () => void;
}

export function EClassHeader({
  eclass,
  onEdit,
}: EClassHeaderProps) {
  const { t } = useTranslation();
  const {
      buttonClose,
      handleClose,
      setModalProps
  } = useModalNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleShowModalToggleStatus = async () => {
    if (!eclass) return;
    setModalProps({
      visible: true,
      params: {
          type: 'info',
          title: t(
            eclass.status === EClassStatus.OPEN
              ? 'close_class_title'
              : 'open_class_title'
          ),
          content: t(
            eclass.status === EClassStatus.OPEN
              ? 'close_class_content'
              : 'open_class_content'
          ),
          buttons: [
            buttonClose,
            {
              type: "YES",
              onPress: () => handleToggleStatus()
            }
          ]
      }
    });
  };

    const handleToggleStatus = async () => {
      if (!eclass) return;
      setIsLoading(true);
      try {
        await eclassApi.updateEClassStatus(
          eclass.id, 
          eclass.status === EClassStatus.OPEN? EClassStatus.CLOSED : EClassStatus.OPEN
        );
        handleClose();
      } catch (error) {
         setModalProps({
          visible: true,
          params: {
              type: 'error',
              title: t('error_toggling_class_status_title'),
              content: t('error_toggling_class_status_content'),
              buttons: [
                buttonClose
              ]
          }
        });
      }
      setIsLoading(false);
    }

  if (!eclass) {
    return null;
  }  
  const isOpen = eclass.status === EClassStatus.OPEN;

  return (
    <div className="mb-5 pb-4 border-bottom">
      <div className="row align-items-start">
        <div className="col-lg-8">
          <div className='d-flex justify-content-start align-items-center'>
            <img
              src={eclass.avatar.url}
              alt={eclass.displayName}
              className="rounded"
              width={60}
              height={60}
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
            <h1 className="m-3">{eclass.displayName}</h1>
          </div>
          <p className="text-muted mb-3">{eclass.shortDescription}</p>

          <div className="d-flex flex-wrap gap-3 align-items-center">
            <div>
              <Badge
                bg={isOpen ? 'success' : 'secondary'}
                className="p-2 d-flex align-items-center gap-2"
              >
                <span className="rounded-circle bg-white d-inline-block" style={{ width: '6px', height: '6px' }} />
                {t(isOpen ? 'open' : 'closed')}
              </Badge>
            </div>

            <small className="text-muted">
              {t('created_at')}: {formatDate(eclass.createdAt)}
            </small>

            <small className="text-muted">
              {t('updated_at')}: {formatDateTime(eclass.updatedAt)}
            </small>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="d-flex gap-2 justify-content-lg-end">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onEdit}
              disabled={isLoading}
              className="d-flex align-items-center gap-2"
            >
              <Edit size={16} />
              {t('edit')}
            </Button>

            <Button
              variant={isOpen ? 'outline-danger' : 'outline-success'}
              size="sm"
              onClick={handleShowModalToggleStatus}
              disabled={isLoading}
              className="d-flex align-items-center gap-2"
            >
              {isOpen ? <Lock size={16} /> : <Unlock size={16} />}
              {t(
                isOpen
                  ? 'open'
                  : 'closed'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EClassHeader;
