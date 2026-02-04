"use client";

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { EClass } from '@packages/types/EClass';
import { useParams, useRouter } from 'next/navigation';
import EClassHeader from '@/components/teachers/eclass/EClassHeader';
import EClassStats from '@/components/teachers/eclass/EClassStats';
import AssignmentList from '@/components/teachers/eclass/assignment/AssignmentList';
import StudentList from '@/components/teachers/eclass/assignment/StudentList';
import { eclassApi } from '@api';

function EClassDetailPage() {
    const param = useParams();
    const eclassId = param.id as string;
    const router = useRouter();
    const [eclass, setEClass] = useState<EClass | null>(null);
    const [eclassStats, setEClassStats] = useState({
        totalStudents: 0,
        totalAssignments: 0,
        openAssignments: 0,
        upcomingAssignments: 0,
    });

    const handleEditClass = () => {
        router.replace(`edit/${eclassId}`)
    };

    useEffect(() => {
      eclassApi.getEClassById(eclassId)
        .then((response) => {
          setEClass(response.data);
        });
      eclassApi.getEClassStatistics(eclassId)
        .then((response) => {
          setEClassStats((prev) => ({
            ...prev,
            ...response.data,
          }));
        });
    }, [eclassId]);

    useEffect(() => {
      setEClassStats((prev) => ({
        ...prev,
        totalStudents: eclass?.students || 0,
      }));
    }, [eclass]);

  return (
    <div className="py-4" style={{ minHeight: '100vh' }}>
      <Container className="max-w-6xl mx-auto px-3">
        <EClassHeader
          eclass={eclass}
          onEdit={handleEditClass}
        />

        <EClassStats
          {...eclassStats}
        />

        <div className="row g-4">
          <div className="col-lg-8">
            <AssignmentList/>
            
          </div>

          <div className="col-lg-4">
            <StudentList/>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EClassDetailPage;
