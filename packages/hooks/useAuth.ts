'use client';
import { RootState } from "@store";
import { useSelector } from "react-redux";
import { logout as logoutSlice } from "@store";
import { authApi } from "@api"; 
import { loginThunk } from "@store/thunks/auth.thunk";
import { useAppDispatch } from "./useAppDispatch";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const login = (email: string, password: string) => {
        return dispatch(loginThunk({ email, password }));
    };

    const logout = () => {
        authApi.logout()
        .then(() => {
             dispatch(logoutSlice());
        });

    }
    
    return { ...auth, logout, login };
};