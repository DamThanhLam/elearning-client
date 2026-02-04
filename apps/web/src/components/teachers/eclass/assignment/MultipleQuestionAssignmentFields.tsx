import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

interface MultipleQuestionAssignmentFieldsProps {
  questionCount: number;
  error?: string;
  onChange: (field: string, value: unknown) => void;
}

export function MultipleQuestionAssignmentFields({
  questionCount,
  error,
  onChange,
}: MultipleQuestionAssignmentFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-5 pb-4">
      <h6 className="mb-4 fw-bold">{t('assignment.form.typeSpecificFields')}</h6>

      <div className="alert alert-info mb-4" role="alert">
        <p className="mb-0 small">
          {t('assignment.type.multipleQuestions')} - {t('assignment.form.questionCountHint')}
        </p>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>{t('assignment.form.questionCount')}</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={questionCount}
          onChange={(e) => onChange('questionCount', parseInt(e.target.value) || 0)}
          isInvalid={!!error}
          placeholder={t('assignment.form.questionCountHint')}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          {t('assignment.form.questionCountHint')}
        </Form.Text>
      </Form.Group>
    </div>
  );
}

export default MultipleQuestionAssignmentFields;
