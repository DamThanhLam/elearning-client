import { api } from "./api";

export const eclassAssignmentApi = {
    getAssignments: async (eclassId: string, params?: { nextPageToken?: string; limit?: number }) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/assignments`, {
            params: {
                ...params,
            }
        }),
};