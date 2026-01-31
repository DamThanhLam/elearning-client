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
}