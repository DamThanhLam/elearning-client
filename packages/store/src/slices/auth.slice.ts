'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth.thunk";

type AuthState = {
    token: string | null;
    user?: { id: string; name: string };
    loading?: boolean;
    error?: String;
};

const initialState: AuthState = {
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthState>) {
            return action.payload;
        },
        logout(state) {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;