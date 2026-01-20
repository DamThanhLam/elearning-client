import { api } from "./api";

export const authApi = {
    login: async (username: string, password: string) => 
        api.post('/login', { username, password })
    ,
    logout: async () => 
        api.post('/logout')
};