import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { ChevronLeft, Save } from 'lucide-react';
import {
  AssignmentFormData,
  AssignmentCreateType,
  AssignmentStatus,
  ProgrammingLanguage,
  MultipleQuestionAssignmentFormData,
  ProgrammingAssignmentFormData,
} from '@packages/types/Assignment';
import AssignmentCommonFields from './AssignmentCommonFields';
import MultipleQuestionAssignmentFields from './MultipleQuestionAssignmentFields';
import ProgrammingAssignmentFields from './ProgrammingAssignmentFields';
import { eclassAssignmentApi } from '@api';

interface AssignmentFormProps {
  eclassId?: string;
  assignmentId?: string;
  onSubmit: (data: AssignmentFormData) => Promise<void>;
  onCancel: () => void;
}

interface FormState {
  displayName: string;
  shortDescription: string;
  description: string;
  type: AssignmentCreateType | '';
  startAt: number;
  dueAt: number;
  status: AssignmentStatus | '';
  questionCount: number;
  language: ProgrammingLanguage | '';
  languageVersion: string;
}

interface FormErrors {
  displayName?: string;
  description?: string;
  shortDescription?: string;
  type?: string;
  startAt?: string;
  dueAt?: string;
  status?: string;
  questionCount?: string;
  language?: string;
  languageVersion?: string;
}

export function AssignmentForm({
  eclassId,
  assignmentId,
  onSubmit,
  onCancel,
}: AssignmentFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormState>({
    displayName: '',
    shortDescription: '',
    description: '',
    type: '',
    startAt: Date.now(),
    dueAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    status: AssignmentStatus.OPEN,
    questionCount: 1,
    language: '',
    languageVersion: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eclassId && assignmentId) {
      eclassAssignmentApi.getAssignment(eclassId, assignmentId)
        .then((response) => {
          const data = response.data;
          setFormData(prev => ({...prev,...data}));
        })
        .catch((error) => {
          console.error('Error fetching assignment data:', error);
        });
      eclassAssignmentApi.getAssignmentDescription(eclassId, assignmentId)
        .then((response) => {
          const data = response.data;
          setFormData(prev => ({...prev, description: data || ''}));
        })
        .catch((error) => {
          console.error('Error fetching assignment description:', error);
        });
    }
  }, [assignmentId, eclassId]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = t('required');
    }

    if (!formData.description.trim()) {
      newErrors.description = t('required');
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = t('required');
    }

    if (!formData.type) {
      newErrors.type = t('required');
    }

    if (!formData.startAt) {
      newErrors.startAt = t('required');
    }

    if (!formData.dueAt) {
      newErrors.dueAt = t('required');
    }

    if (formData.dueAt <= formData.startAt) {
      newErrors.dueAt = t('assignment_validation_due_date_after_start');
    }

    if (!formData.status) {
      newErrors.status = t('required');
    }

    if (formData.type === AssignmentCreateType.MULTIPLE_QUESTIONS) {
      if (formData.questionCount < 1) {
        newErrors.questionCount = t('assignment_validation_question_count_min');
      }
    }

    if (formData.type === AssignmentCreateType.PROGRAMMING) {
      if (!formData.language) {
        newErrors.language = t('required');
      }

      if (!formData.languageVersion.trim()) {
        newErrors.languageVersion = t(
          'required'
        );
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const buildRequestPayload = useCallback((): AssignmentFormData | null => {
    if (formData.type === AssignmentCreateType.MULTIPLE_QUESTIONS) {
      return {
        displayName: formData.displayName.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        type: AssignmentCreateType.MULTIPLE_QUESTIONS,
        startAt: formData.startAt,
        dueAt: formData.dueAt,
        status: formData.status as AssignmentStatus,
        questionCount: formData.questionCount,
      } as MultipleQuestionAssignmentFormData;
    }

    if (formData.type === AssignmentCreateType.PROGRAMMING) {
      return {
        displayName: formData.displayName.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        type: AssignmentCreateType.PROGRAMMING,
        startAt: formData.startAt,
        dueAt: formData.dueAt,
        status: formData.status as AssignmentStatus,
        language: formData.language as ProgrammingLanguage,
        languageVersion: formData.languageVersion.trim(),
      } as ProgrammingAssignmentFormData;
    }

    return null;
  }, [formData]);

  const handleFieldChange = (field: string, value: unknown) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'type' && value !== prev.type) {
        updated.language = '';
        updated.languageVersion = '';
        updated.questionCount = 1;
      }

      return updated;
    });

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field as keyof FormErrors];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = buildRequestPayload();
    setIsSubmitting(true);
    payload && await onSubmit(payload);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <AssignmentCommonFields
            data={{
              displayName: formData.displayName,
              shortDescription: formData.shortDescription,
              description: formData.description,
              type: (formData.type as AssignmentCreateType) || null,
              startAt: formData.startAt,
              dueAt: formData.dueAt,
              status: (formData.status as AssignmentStatus) || AssignmentStatus.OPEN,
            }}
            errors={errors}
            onChange={handleFieldChange}
          />

          {formData.type === AssignmentCreateType.PROGRAMMING && (
            <ProgrammingAssignmentFields
              language={(formData.language as ProgrammingLanguage) || null}
              languageVersion={formData.languageVersion}
              errors={errors}
              onChange={handleFieldChange}
            />
          )}

          {formData.type === AssignmentCreateType.MULTIPLE_QUESTIONS && (
            <MultipleQuestionAssignmentFields
              questionCount={formData.questionCount}
              error={errors.questionCount}
              onChange={handleFieldChange}
            />
          )}
        </Card.Body>
      </Card>

      <div className="d-flex gap-3">
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="d-flex align-items-center gap-2"
        >
          <ChevronLeft size={18} />
          {t('discard')}
        </Button>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || !formData.type}
          className="d-flex align-items-center gap-2"
        >
          {isSubmitting && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            />
          )}
          <Save size={18} />
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
    </Form>
  );
}

export default AssignmentForm;
