"use client";

import { DescriptionEditor } from '@/components/editor/DescriptionEditor';
import { StatusSelect } from '@/components/StatusSelect';
import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
  displayName: string;
  shortDescription: string;
  description: string;
  status: string;
}

interface FormErrors {
  displayName?: string;
  description?: string;
}

const CreateEClassForm:React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    shortDescription: '',
    description: '',
    status: 'OPEN'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = t('createEClass.validation.displayNameRequired');
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formData.description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    if (!textContent.trim()) {
      newErrors.description = t('createEClass.validation.descriptionRequired');
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
      console.log('Submitting EClass:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert(t('createEClass.success'));

      setFormData({
        displayName: '',
        shortDescription: '',
        description: '',
        status: 'OPEN'
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating EClass:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      setFormData({
        displayName: '',
        shortDescription: '',
        description: '',
        status: 'OPEN'
      });
      setErrors({});
    }
  };

  return (
    <div className="shadow-sm">
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
              className="form-control"
              rows={3}
              placeholder={t('short_description')}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />
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