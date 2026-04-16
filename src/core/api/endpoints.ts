// API Base URL
export const API_BASE_URL = 'https://api.example.com';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',

    // User
    GET_USER: '/user/profile',
    UPDATE_USER: '/user/update',

    // Products
    GET_PRODUCTS: '/products',
    GET_PRODUCT_DETAIL: '/products/:id',
} as const;