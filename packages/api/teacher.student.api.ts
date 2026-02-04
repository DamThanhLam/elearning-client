import { api } from "./api";

export const eclassMemberApi = {
    getMembers: async (eclassId: string, params?: { nextPageToken?: string; limit?: number }) =>
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${eclassId}/members`, {
            params: {  
                ...params,
            }
        }),
};