import { userApi } from "@api/user.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInformationThunk = createAsyncThunk(
    "user/getUserInformation",
    async (payload:{}, {rejectWithValue}) => {
        try {
            const response = await userApi.getUserInformation();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)