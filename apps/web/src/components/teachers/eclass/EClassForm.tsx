"use client";

import { DescriptionEditor } from "@/components/editor/DescriptionEditor";
import { StatusSelect } from "@/components/StatusSelect";
import { eclassApi } from "@api";
import { useModalNotification } from "@hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface EClassFormProps {
  eclassId?: string;
  onSubmit: (data: EClassForm, eclassId: string) => Promise<any>;
  action: 'create' | 'update';
}

interface EClassForm {
  displayName: string,
  shortDescription: string,
  description: string,
  status: string
}

interface FormErrors {
  displayName?: string;
  shortDescription?: string;
  description?: string;
  status?: string;
}

const initialCreateEClassRequest: EClassForm = {
  displayName: '',
  shortDescription: '',
  description: '',
  status: 'OPEN'
};


function EClassForm({ eclassId, onSubmit, action }: EClassFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState<EClassForm>(initialCreateEClassRequest);
  const [errors, setErrors] = useState<FormErrors>({});
  const { setModalProps, buttonClose, handleClose } = useModalNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eclassId) {
      eclassApi.getEClassById(eclassId).then(response => {
        const data = response.data;
        setFormData(prev => ({...prev, ...data}));
      }).catch(error => {
        console.error('Error fetching EClass data:', error);
      });
      eclassApi.getEClassDescriptionById(eclassId).then(response => {
        const data = response.data;
        setFormData(prev => ({
          ...prev,
          description: data.description
        }));
      }).catch(error => {
        console.error('Error fetching EClass description:', error);
      });
    }
  }, [eclassId]);

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
      const response = await onSubmit(formData, eclassId || "0");
      setModalProps({
        visible: true,
        params: {
          title: t(`eclass.${action}.success`),
          content: t(`eclass.${action}.success_content`),
          type: 'success',
          buttons: [{
            type: "CLOSE",
            onPress: () => {
              handleClose();
              router.replace('/teacher/eclass/' + response.data);
            }
          }]
        }
      });
      setFormData(initialCreateEClassRequest);
      setErrors({});
    } catch (error) {
      console.error('Error creating EClass:', error);
      setModalProps({
        visible: true,
        params: {
          title: t(`eclass.${action}.error`),
          content: t(`eclass.${action}.error_content`),
          type: 'success',
          buttons: [buttonClose]
        }
      });
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
  );
}
export default EClassForm;