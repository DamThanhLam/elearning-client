import { api } from "./api";

export interface GetEClassesParams {
    displayName?: string;
    nextPageToken?: string | undefined;
    previousPageToken?: string | undefined;
    limit?: number | 15;
}

export interface CreateEClassRequest {
    displayName: string;
    shortDescription: string;
    description: string;
    status: string;
}

export const eclassApi = {
    getEClasses: async (params?: GetEClassesParams) => 
        api.get("/eclasses/api/v1/teachers/me/eclasses", {
            params: {
                ...params,
            }
        }),
    postEClass: async (data: CreateEClassRequest) => 
        api.post("/eclasses/api/v1/teachers/me/eclasses", data),
}