'use client';
import { useAppDispatch } from "./useAppDispatch";
import { getUserInformationThunk } from "@store/thunks/user.thunk";

export const useUser = () => {
    const dispatch = useAppDispatch();
    const getUserInformation = () => {
        return dispatch(getUserInformationThunk({}));
    };
    return { getUserInformation };
};