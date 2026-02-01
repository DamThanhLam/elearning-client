"use client";

import { DescriptionEditor } from '@/components/editor/DescriptionEditor';
import { StatusSelect } from '@/components/StatusSelect';
import { CreateEClassRequest, eclassApi } from '@api/teacher.eclass.api';
import { useModalNotification } from '@hooks';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';


interface FormErrors {
  displayName?: string;
  shortDescription?: string;
  description?: string;
  status?: string;
}

const initialCreateEClassRequest: CreateEClassRequest = {
  displayName: '',
  shortDescription: '',
  description: '',
  status: 'OPEN'
};

const CreateEClassForm:React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { setModalProps, buttonClose, handleClose } = useModalNotification();
  const [formData, setFormData] = useState<CreateEClassRequest>(initialCreateEClassRequest);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = t('required');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('required');
    }
    if (!formData.status.trim()) {
      newErrors.status = t('required');
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = t('required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await eclassApi.postEClass(formData);
      setModalProps({
        visible: true,
        params: {
          title: t('success'),
          content: t('eclass_created_successfully'),
          type: 'success',
          buttons: [buttonClose]
        }
      });
      setFormData(initialCreateEClassRequest);
      setErrors({});
    } catch (error) {
      console.error('Error creating EClass:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setModalProps({
        visible: true,
        params: {
          title: t('confirm'),
          content: t('are_you_sure_you_want_to_cancel_all_changes_will_be_lost'),
          type: 'warning',
          buttons: [
            buttonClose,
            {
              type: "YES",
              onPress: () => {
                setFormData(initialCreateEClassRequest),
                setErrors({});
                router.replace("/teacher/eclass");
                handleClose();
              }
            }
          ]
        }
      });
  };

  return (
    <div>
        <h2 className="card-title mb-4">{t('create_eclass')}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="displayName" className="form-label">
              {t('display_name')} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="displayName"
              className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}
              placeholder={t('display_name')}
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            />
            {errors.displayName && (
              <div className="invalid-feedback">{errors.displayName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="short_description" className="form-label">
              {t('short_description')} <span className="text-danger">*</span>
            </label>
            <textarea
              id="shortDescription"
              className={`form-control ${errors.shortDescription ? 'is-invalid' : ''}`}
              rows={3}
              placeholder={t('short_description')}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
            {errors.shortDescription && (
              <div className="invalid-feedback">{errors.shortDescription}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">
              {t('description')} <span className="text-danger">*</span>
            </label>
            <DescriptionEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              error={errors.description}
            />
          </div>

          <StatusSelect
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
          />

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {t('submit')}
                </>
              ) : (
                t('submit')
              )}
            </button>
          </div>
        </form>
    </div>
  );
};

export default CreateEClassForm;