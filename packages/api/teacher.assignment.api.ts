import { api } from "./api";

export const eclassAssignmentApi = {
    getAssignments: async (eclassId: string, params?: { nextPageToken?: string; limit?: number, sort?: string }) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments`, {
            params: {
                ...params,
            }
        }),
    addAssignment: async (eclassId: string, data: any) =>
        api.post(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments`, data),
};