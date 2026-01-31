import axios from 'axios';
import { store } from '../store/src/store';
import { logout } from '../store/src/slices/auth.slice';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
});

api.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
});

api.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401) {
        store.dispatch(logout());
    }
    return Promise.reject(error);
});