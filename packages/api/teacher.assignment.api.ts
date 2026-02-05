import { api } from "./api";

export const eclassAssignmentApi = {
    getAssignments: async (eclassId: string, params?: { nextPageToken?: string; limit?: number, sort?: string }) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments`, {
            params: {
                ...params,
            }
        }),
    getAssignment: async (eclassId: string, assignmentId: string) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments/${assignmentId}`),
    getAssignmentDescription: async (eclassId: string, assignmentId: string) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments/${assignmentId}/description`),
    addAssignment: async (eclassId: string, data: any) =>
        api.post(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments`, data),
    updateAssignment: async (eclassId: string, assignmentId: string, data: any) =>
        api.put(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments/${assignmentId}`, data),
};