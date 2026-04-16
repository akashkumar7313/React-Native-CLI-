import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { store } from '../../app/store';
import { logout } from '../../features/auth/redux/authSlice';
import { navigationRef, reset } from '../navigation/navigationRef';
import {
    BASE_URL,
    API_TIMEOUTS,
    DEFAULT_HEADERS,
    STATUS_CODES,
    ERROR_MESSAGES,
} from './ApiConfig';
import { ApiResponse } from './ApiResponse';
import { addApiLogInterceptor } from './interceptors/apiLogInterceptor';

/**
 * Creates and configures an Axios instance for API calls.
 */
const createApiService = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: API_TIMEOUTS.CONNECT,
        headers: DEFAULT_HEADERS,
    });

    // Add logging interceptor for development
    addApiLogInterceptor(instance);

    // --- Request Interceptor ---
    instance.interceptors.request.use(
        async (config: AxiosRequestConfig): Promise<any> => {
            // 1. Check for internet connection
            const netState = await NetInfo.fetch();
            if (!netState.isConnected || !netState.isInternetReachable) {
                return Promise.reject(new Error(ERROR_MESSAGES.NETWORK));
            }

            // 2. Get token from Redux store and add to headers
            const token = store.getState().auth.token;
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error: AxiosError) => Promise.reject(error),
    );

    // --- Response Interceptor ---
    instance.interceptors.response.use(
        (response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            return response;
        },
        (error: AxiosError) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            handleApiError(error);
            return Promise.reject(error);
        },
    );

    return instance;
};

/**
 * Handles API errors, especially for 401/403 status codes.
 * @param error The Axios error object.
 */
const handleApiError = (error: AxiosError) => {
    const status = error.response?.status;

    if (
        status === STATUS_CODES.UNAUTHORIZED ||
        status === STATUS_CODES.FORBIDDEN
    ) {
        // Dispatch logout action
        store.dispatch(logout());
        // Navigate to Login screen
        if (navigationRef.isReady()) {
            reset('Login');
        }
    }
};

const apiService = createApiService();

/**
 * A generic function to parse API responses.
 * @param response The raw Axios response.
 * @param parser A function to transform the response data.
 * @returns A standardized ApiResponse object.
 */
const parseResponse = <T>(
    response: any,
    parser: (data: any) => T,
): ApiResponse<T> => {
    const rawData = response.data?.data ?? response.data;
    const parsedData = rawData ? parser(rawData) : null;

    return {
        data: parsedData,
        message: response.data?.message || 'Success',
        token: response.data?.token || null,
        success: true,
    };
};

// --- Exported API Methods ---

export const get = async <T>(
    endpoint: string,
    parser: (data: any) => T,
    params?: any,
): Promise<ApiResponse<T>> => {
    const response = await apiService.get(endpoint, { params });
    return parseResponse(response, parser);
};

export const post = async <T>(
    endpoint: string,
    body: any,
    parser: (data: any) => T,
): Promise<ApiResponse<T>> => {
    const response = await apiService.post(endpoint, body);
    return parseResponse(response, parser);
};

export const put = async <T>(
    endpoint: string,
    body: any,
    parser: (data: any) => T,
): Promise<ApiResponse<T>> => {
    const response = await apiService.put(endpoint, body);
    return parseResponse(response, parser);
};

export const del = async <T>(
    endpoint: string,
    parser: (data: any) => T,
): Promise<ApiResponse<T>> => {
    const response = await apiService.delete(endpoint);
    return parseResponse(response, parser);
};