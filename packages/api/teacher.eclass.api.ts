import { api } from "./api";

export interface GetEClassesParams {
    displayName?: string;
    nextPageToken?: string | undefined;
    previousPageToken?: string | undefined;
    limit?: number | 15;
}

export const eclassApi = {
    getEClasses: async (params?: GetEClassesParams) => 
        api.get("/eclasses/api/v1/teachers/me/eclasses", {
            params: {
                ...params,
            }
        }),
    getEClassById: async (id: string) => 
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${id}`),
    getEClassDescriptionById: async (id: string) => 
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${id}/description`),
    postEClass: async (data: any) => 
        api.post("/eclasses/api/v1/teachers/me/eclasses", data),
    updateEClassStatus: async (id: string, status: string) => 
        api.put(`/eclasses/api/v1/teachers/me/eclasses/${id}/status`, { status }),
    updateEClass: async (data: any, id: string) => 
        api.put(`/eclasses/api/v1/teachers/me/eclasses/${id}`, data),
    getEClassStatistics: async (id: string) => 
        api.get(`/eclasses/api/v1/teachers/me/eclasses/${id}/statistics`),
}