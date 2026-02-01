import { useTranslation } from 'react-i18next';

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-3">
      <label htmlFor="status" className="form-label">
        {t('status')}
      </label>
      <select
        id="status"
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="OPEN">{t('open')}</option>
        <option value="CLOSED">{t('closed')}</option>
      </select>
    </div>
  );
};
