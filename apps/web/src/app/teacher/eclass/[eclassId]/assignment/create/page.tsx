"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Alert } from 'react-bootstrap';
import { AssignmentFormData } from '@packages/types/Assignment';
import AssignmentForm from '@/components/teachers/eclass/assignment/AssignmentForm';
import { eclassAssignmentApi } from '@api';
import { useParams, useRouter } from 'next/navigation';
import { useModalNotification } from '@hooks';

export function CreateAssignmentPage() {
  const { t } = useTranslation();
  const eclassId = useParams().eclassId as string;
  const router = useRouter();
  const { buttonClose, handleClose, setModalProps } = useModalNotification();

  const handleSubmit = async (data: AssignmentFormData) => {
    try{
      const response = await eclassAssignmentApi.addAssignment(eclassId, data);
      setModalProps({
        visible: true,
        params: {
          title: t('assignment_create_success_title'),
          content: t('assignment_create_success_message'),
          type: 'success',
          buttons: [
            {
              type: 'CLOSE', 
              onPress: () => {
                handleClose();
                router.push(`${response.data}`); 
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
          title: t('assignment_create_fail_title'),
          content: t('assignment_create_fail_message'),
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
        title: t('assignment_create_cancel_title'),
        content: t('assignment_create_cancel_message'),
        type: 'info',
        buttons: [
          buttonClose,
          {
            type: 'YES', 
            onPress: () => {
              handleClose();
              router.replace("../");
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
          <h1 className="mb-2">{t('assignment_create_title')}</h1>
          <p className="text-muted">{t('assignment_create_subtitle')}</p>
        </div>
        <AssignmentForm
          eclassId={eclassId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Container>
    </div>
  );
}

export default CreateAssignmentPage;
