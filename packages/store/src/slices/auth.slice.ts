'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth.thunk";
import { UserRole } from "packages/types/UserType";
import { getUserInformationThunk } from "@store/thunks/user.thunk";

type AuthState = {
    user?: { name: string; roles: UserRole[] };
    activeRole?: UserRole;
    loading?: boolean;
    error?: String;
};

const initialState: AuthState = {
    user: null
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
        },
        setActiveRole(state, action: PayloadAction<UserRole>) {
            state.activeRole = action.payload;
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
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getUserInformationThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getUserInformationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserInformationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});
export const { setAuth, logout, setActiveRole } = authSlice.actions;
export default authSlice.reducer;