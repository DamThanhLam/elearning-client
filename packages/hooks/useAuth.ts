'use client';
import { RootState } from "@store";
import { useSelector } from "react-redux";
import { logout as logoutSlice } from "@store";
import { authApi } from "@api"; 
import { loginThunk } from "@store/thunks/auth.thunk";
import { useAppDispatch } from "./useAppDispatch";
import { RegisterUserPayload } from "packages/types/UserType";
import { setActiveRole } from "@store/slices/auth.slice";
import { getUserInformationThunk } from "@store/thunks/user.thunk";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const login = (email: string, password: string) => {
        return dispatch(loginThunk({ email, password }));
    };

    const getUserInformation = () => {
        return dispatch(getUserInformationThunk({}));
    };

    const logout = () => {
        authApi.logout()
        .then(() => {
             dispatch(logoutSlice());
        });
    }

    const signUp = (data: RegisterUserPayload) => {
        return authApi.signUp(data);
    }
    const sendOtp = (email: string) => {
        return authApi.sendOtp(email);
    }
    const resetPassword = (email: string, otp: string, newPassword: string) => {
        return authApi.resetPassword(email, otp, newPassword);
    }
    return { ...auth, logout, login, signUp, setActiveRole, sendOtp, resetPassword, getUserInformation };
};