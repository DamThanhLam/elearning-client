import { api } from "./api";

export const authApi = {
    login: async (username: string, password: string) => 
        api.post('/auth/login', { username, password })
    ,
    logout: async () => 
        api.post('/auth/logout')
};