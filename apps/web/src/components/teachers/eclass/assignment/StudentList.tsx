"use client";

import { InfiniteGridList } from "@/components/cards/InfiniteGridList";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Form, ListGroup } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { eclassMemberApi } from "@api";
import { EClassMember } from "@packages/types/EClassMember";
import StudentItem from "./StudentItem";
import StudentOffcanvas from "../StudentOffcanvas";

function StudentList(){
    const { t } = useTranslation();
    const router = useRouter();
    const eclassId = useParams().eclassId as string;
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<EClassMember[]>([]);
    const [studentPageToken, setStudentPageToken] = useState({
        nextPageToken: undefined,
        hasNext: true,
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<EClassMember | null>(null);
    
    const loadMoreEClasses = useCallback(async () => {
        if (loading || !studentPageToken.hasNext) return;

        setLoading(true);
        try {
            const result = await eclassMemberApi.getMembers(
                eclassId,
                {
                    nextPageToken: studentPageToken.nextPageToken,
                    limit: 15,
                }
            );
            setStudents((prev) => [...prev, ...result.data.items]);
            setStudentPageToken({
                nextPageToken: result.data.nextPageToken,
                hasNext: result.data.hasNext,
            });
            setHasMore(result.data.hasNext);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [loading, studentPageToken, eclassId]);

    useEffect(() => {
        setStudents([]);
        setStudentPageToken({ 
            hasNext: true,
            nextPageToken: undefined
         });
        setHasMore(true);
        setInitialLoading(true);

        loadMoreEClasses();
    }, [searchTerm]);
    return(
        <>
      <div className="mb-5">
        <h5 className="mb-3">{t('students')}</h5>

        {students.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Control
              placeholder={t('search_students')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control-sm"
            />
          </Form.Group>
        )}
        <Card className="border-0 shadow-sm">
            <ListGroup variant="flush">
                <InfiniteGridList<EClassMember>
                items={students}
                loading={loading}
                hasMore={hasMore}
                initialLoading={initialLoading}
                loadMore={loadMoreEClasses}
                renderItem={(student) => (
                <StudentItem
                    student={student}
                    onClick={(student) => {setSelectedStudent(student)}}
                />
                )}
                emptyTitle={''}
                emptyDescription={''}
            />
            </ListGroup>
        </Card>
      </div>

      <StudentOffcanvas
        isOpen={!!selectedStudent}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </>
    );
}
export default StudentList;