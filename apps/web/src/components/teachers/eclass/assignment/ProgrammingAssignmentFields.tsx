import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { ProgrammingLanguage } from '@packages/types/Assignment';

interface ProgrammingAssignmentFieldsProps {
  language: ProgrammingLanguage | null;
  languageVersion: string;
  errors: Record<string, string>;
  onChange: (field: string, value: unknown) => void;
}

export function ProgrammingAssignmentFields({
  language,
  languageVersion,
  errors,
  onChange,
}: ProgrammingAssignmentFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-5 pb-4">
      <h6 className="mb-4 fw-bold">{t('type_specific_fields')}</h6>

      <div className="alert alert-info mb-4" role="alert">
        <p className="mb-0 small">
          {t('programming')} - {t('language_hint')}
        </p>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>{t('language')}</Form.Label>
        <Form.Select
          value={language || ''}
          onChange={(e) => onChange('language', e.target.value as ProgrammingLanguage)}
          isInvalid={!!errors.language}
        >
          <option value="">-- {t('language_hint')} --</option>
          {Object.entries(ProgrammingLanguage).map(([key, value]) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.language}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('language_version')}</Form.Label>
        <Form.Control
          type="text"
          value={languageVersion}
          onChange={(e) => onChange('languageVersion', e.target.value)}
          isInvalid={!!errors.languageVersion}
          placeholder={t('language_version_placeholder')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.languageVersion}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          {t('language_version_placeholder')}
        </Form.Text>
      </Form.Group>
    </div>
  );
}

export default ProgrammingAssignmentFields;
