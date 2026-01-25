import { authApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (
        payload: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await authApi.login(
                payload.email,
                payload.password
            );
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)
