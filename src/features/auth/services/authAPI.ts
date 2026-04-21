// src/features/auth/services/authAPI.ts
import { post } from '../../../core/api/apiService';  // ✅ post method import करें
import { API_ENDPOINTS } from '../../../core/api/endpoints';

export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
    deviceToken?: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
}

// Parser function for login response
const loginParser = (data: any) => data;

const authAPI = {
    // ✅ Login API - post method use करें
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await post(API_ENDPOINTS.AUTH.LOGIN, credentials, loginParser);
        return {
            success: response.success,
            message: response.message,
            data: response.data,
        };
    },

    // ✅ Signup API
    signup: async (userData: any): Promise<LoginResponse> => {
        const response = await post(API_ENDPOINTS.AUTH.SIGNUP, userData, loginParser);
        return {
            success: response.success,
            message: response.message,
            data: response.data,
        };
    },

    // ✅ Forgot Password API
    forgotPassword: async (email: string): Promise<any> => {
        const response = await post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }, (data: any) => data);
        return response;
    },
};

export default authAPI;