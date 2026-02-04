import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { BaseAssignmentFormData, AssignmentCreateType, AssignmentStatus } from '@packages/types/Assignment';
import { formatDateTimeForInput, parseDateTimeInput } from '@utils/Date';
import { DescriptionEditor } from '@/components/editor/DescriptionEditor';

interface AssignmentCommonFieldsProps {
  data: BaseAssignmentFormData;
  errors: Record<string, string>;
  onChange: (field: keyof BaseAssignmentFormData, value: unknown) => void;
}

export function AssignmentCommonFields({
  data,
  errors,
  onChange,
}: AssignmentCommonFieldsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-5 pb-4 border-bottom">
      <h6 className="mb-4 fw-bold">{t('common_fields')}</h6>

      <Form.Group className="mb-3">
        <Form.Label>{t('display_name')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('display_name_placeholder')}
          value={data.displayName}
          onChange={(e) => onChange('displayName', e.target.value)}
          isInvalid={!!errors.displayName}
          disabled={false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.displayName}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('short_description')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={t('short_description_laceholder')}
          value={data.shortDescription}
          onChange={(e) => onChange('shortDescription', e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.shortDescription}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('description')}</Form.Label>
        <DescriptionEditor
            value={data.description}
            onChange={(value) => onChange('description', value)}
            error={errors.description}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('type')}</Form.Label>
        <Form.Select
          value={data.type}
          onChange={(e) => onChange('type', e.target.value as AssignmentCreateType)}
          isInvalid={!!errors.type}
        >
          <option value="">-- {t('type_hint')} --</option>
          <option value={AssignmentCreateType.PROGRAMMING}>
            {t('programming')}
          </option>
          <option value={AssignmentCreateType.MULTIPLE_QUESTIONS}>
            {t('multiple_questions')}
          </option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.type}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('start_at')}</Form.Label>
        <Form.Control
          type="datetime-local"
          value={formatDateTimeForInput(data.startAt)}
          onChange={(e) => onChange('startAt', parseDateTimeInput(e.target.value))}
          isInvalid={!!errors.startAt}
        />
        <Form.Control.Feedback type="invalid">
          {errors.startAt}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('due_at')}</Form.Label>
        <Form.Control
          type="datetime-local"
          value={formatDateTimeForInput(data.dueAt)}
          onChange={(e) => onChange('dueAt', parseDateTimeInput(e.target.value))}
          isInvalid={!!errors.dueAt}
        />
        <Form.Control.Feedback type="invalid">
          {errors.dueAt}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t('status')}</Form.Label>
        <Form.Select
          value={data.status}
          onChange={(e) => onChange('status', e.target.value as AssignmentStatus)}
          isInvalid={!!errors.status}
        >
          <option value="">-- {t('status')} --</option>
          <option value={AssignmentStatus.DRAFT}>
            {t('draft')}
          </option>
          <option value={AssignmentStatus.OPEN}>
            {t('open')}
          </option>
          <option value={AssignmentStatus.CLOSED}>
            {t('closed')}
          </option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.status}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}

export default AssignmentCommonFields;
