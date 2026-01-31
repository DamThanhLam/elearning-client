import { api } from "./api";

export const userApi = {
    getUserInformation: async () => 
        api.get('/users/api/v1/users/information')
}