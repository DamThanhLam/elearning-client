"use client";

"use client";

import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { AssignmentFormData } from '@packages/types/Assignment';
import AssignmentForm from '@/components/teachers/eclass/assignment/AssignmentForm';
import { eclassAssignmentApi } from '@api';
import { useParams, useRouter } from 'next/navigation';
import { useModalNotification } from '@hooks';

export function UpdateAssignmentPage() {
  const { t } = useTranslation();
  const params = useParams();
  const eclassId = params.eclassId as string;
  const assignmentId = params.assignmentId as string;
  const router = useRouter();
  const { buttonClose, handleClose, setModalProps } = useModalNotification();

  const handleSubmit = async (data: AssignmentFormData) => {
    try{
      await eclassAssignmentApi.updateAssignment(eclassId, assignmentId, data);
      setModalProps({
        visible: true,
        params: {
          title: t('assignment_update_success_title'),
          content: t('assignment_update_success_message'),
          type: 'success',
          buttons: [
            {
              type: 'CLOSE', 
              onPress: () => {
                handleClose();
                router.replace(`/teacher/eclass/${eclassId}/assignment/${assignmentId}`);
              }
            },
          ]
        }
      });
    } catch (error) {
      console.error('Error creating assignment:', error);
      setModalProps({
        visible: true,
        params: {
          title: t('assignment_update_fail_title'),
          content: t('assignment_update_fail_message'),
          type: 'success',
          buttons: [buttonClose]
        }
      });
      return;
    }
  };

  const handleCancel = () => {
    setModalProps({
      visible: true,
      params: {
        title: t('assignment_update_cancel_title'),
        content: t('assignment_update_cancel_message'),
        type: 'info',
        buttons: [
          buttonClose,
          {
            type: 'YES', 
            onPress: () => {
              handleClose();
              router.replace(`/teacher/eclass/${eclassId}`);
            }
          }
        ]
      }
    });
  };

  return (
    <div className="py-4" style={{ minHeight: '100vh' }}>
      <Container className="max-w-6xl mx-auto px-3">
        <div className="mb-5">
          <h1 className="mb-2">{t('assignment_update_title')}</h1>
          <p className="text-muted">{t('assignment_update_subtitle')}</p>
        </div>
        <AssignmentForm
          eclassId={eclassId}
          assignmentId={assignmentId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}

export default UpdateAssignmentPage;