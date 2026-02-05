"use client";

import EClassForm from '@/components/teachers/eclass/EClassForm';
import { eclassApi } from '@api';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const CreateEClassForm:React.FC = () => {
  const { t } = useTranslation();
  const eclassId = useParams()?.eclassId as string | undefined;

  return (
    <div>
        <h2 className="card-title mb-4">{t('create_eclass')}</h2>
        <EClassForm eclassId={eclassId} onSubmit={eclassApi.updateEClass} action='update'/>
    </div>
  );
};

export default CreateEClassForm;