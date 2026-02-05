"use client";

import { InfiniteGridList } from "@/components/cards/InfiniteGridList";
import { Assignment, SORT_OPTIONS, SortBy } from "@packages/types/Assignment";
import { use, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AssignmentItem from "./AssignmentItem";
import { Button, Form } from "react-bootstrap";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { eclassAssignmentApi } from "@api";
import ListLayout from "@/components/layouts/ListLayout";
import { it } from "node:test";

function AssignmenList(){
    const { t } = useTranslation();
    const router = useRouter();
    const eclassId = useParams().eclassId as string;
    const [sortBy, setSortBy] = useState<SortBy>('DUE_AT');
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [assignmentPageToken, setAssignmentPageToken] = useState({
        nextPageToken: undefined,
        hasNext: true,
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [refreshLoadMoreAssignment, setRefreshLoadMoreAssignment] = useState(false);
    
    const loadMoreAssignment = useCallback(async () => {
        console.log('loading', loading);
        console.log('assignmentPageToken', assignmentPageToken);
        if (loading || !assignmentPageToken.hasNext) return;

        setLoading(true);
        try {
            console.log('Loading assignments...');
            const result = await eclassAssignmentApi.getAssignments(
                eclassId,
                {
                    sort: SORT_OPTIONS[sortBy],
                    nextPageToken: assignmentPageToken.nextPageToken,
                    limit: 15,
                }
            );
            setAssignments((prev) => [...prev, ...result.data.items]);
            setAssignmentPageToken({
                nextPageToken: result.data.nextPageToken,
                hasNext: result.data.hasNext,
            });
            setHasMore(result.data.hasNext);
        } catch (error) {
            console.error('Failed to load assignments:', error);
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [sortBy, loading, assignmentPageToken]);

    useEffect(() => {
        setAssignments([]);
        setAssignmentPageToken({ 
            hasNext: true,
            nextPageToken: undefined
        });
        setHasMore(true);
        setInitialLoading(true);
        loadMoreAssignment();
        setRefreshLoadMoreAssignment(true);
    }, [sortBy]);

    useEffect(() => {
        if (refreshLoadMoreAssignment) {
            loadMoreAssignment().then(() => {
                setRefreshLoadMoreAssignment(false);
            });
        }
    }, [refreshLoadMoreAssignment]);
    return(
    <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{t('assignments')}</h5>
            <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {router.push(`${eclassId}/assignment/create`)}}
                    className="d-flex align-items-center gap-2"
                >
                <Plus size={18} />
                {t('create_assignment')}
            </Button>
        </div>

        {assignments.length > 0 && (
            <Form.Group className="mb-3">
            <Form.Label className="small text-muted">
                {t('actions')}
            </Form.Label>
            <Form.Select
                size="sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="form-select-sm"
            >
                <option value="DUE_AT">{t('sort_by_due_date')}</option>
                <option value="START_AT">{t('sort_by_start_date')}</option>
                <option value="STATUS">{t('sort_by_status')}</option>
            </Form.Select>
            </Form.Group>
        )}
        <InfiniteGridList<Assignment>
            items={assignments}
            loading={loading}
            hasMore={hasMore}
            layout={(items: React.ReactNode[]) => <ListLayout>{items}</ListLayout>}
            initialLoading={initialLoading}
            loadMore={loadMoreAssignment}
            renderItem={(assignment) => (
            <AssignmentItem
                assignment={assignment}
                actions={{
                    onEdit: (assignment) => {router.push(`${eclassId}/assignment/${assignment.id}/update`)},
                    onToggleStatus: () => {},
                }}
                onViewDetail={(id) => {router.push(`${eclassId}/assignments/${id}`)}}
            />
            )}
            emptyTitle={''}
            emptyDescription={''}
        />
    </div>
    );
}
export default AssignmenList;