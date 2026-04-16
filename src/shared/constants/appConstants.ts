// src/shared/constants/appConstants.ts

export const APP_CONSTANTS = {
    // Timer Constants
    OTP_TIMER: 60, // seconds
    SPLASH_DURATION: 2000, // milliseconds
    DEBOUNCE_DELAY: 500, // milliseconds
    API_TIMEOUT: 30000, // milliseconds
    TOAST_DURATION: 3000, // milliseconds

    // Image Constants
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_IMAGES_UPLOAD: 10,
    SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],

    // Pagination
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,

    // Cache
    CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours

    // App Info
    APP_NAME: 'MyApp',
    APP_VERSION: '1.0.0',

    // Storage Keys
    STORAGE_KEYS: {
        TOKEN: '@auth_token',
        USER: '@user_data',
        THEME: '@theme_preference',
        LANGUAGE: '@language',
        CART: '@cart_data',
    },
};