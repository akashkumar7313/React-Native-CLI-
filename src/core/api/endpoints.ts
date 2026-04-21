// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',           // अपनी API URL से replace करें
        SIGNUP: '/auth/register',
        LOGOUT: '/auth/logout',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },

    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/update',
    },


    // Products
    GET_PRODUCTS: '/products',
    GET_PRODUCT_DETAIL: '/products/:id',
} as const;