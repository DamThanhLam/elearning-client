import { RegisterUserPayload } from "packages/types/User";
import { api } from "./api";

export const authApi = {
    login: async (username: string, password: string) => 
        api.post('/api/v1/login', { username, password }),
    logout: async () => 
        api.post('/api/v1/logout'),
    signUp: async (data: RegisterUserPayload) =>
        api.post('/api/v1/sign-up', data),
    sendOtp: async (email: string) =>
        api.post('/users/api/v1/users/forgot-password/send-otp', { email }),
    resetPassword: async (email: string, otp: string, newPassword: string) =>
        api.post('/users/api/v1/users/forgot-password/otp/verify', { email, otp, newPassword }),
};