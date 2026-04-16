// src/shared/constants/errorMessages.ts

export const ERROR_MESSAGES = {
    // Form Validation Errors
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid 10-digit mobile number',
    INVALID_PASSWORD: 'Password must be at least 6 characters',
    WEAK_PASSWORD: 'Password must contain at least 1 uppercase, 1 lowercase, and 1 number',
    INVALID_PINCODE: 'Please enter a valid 6-digit pincode',
    INVALID_PAN: 'Please enter a valid PAN card number',
    INVALID_GST: 'Please enter a valid GST number',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',

    // Network Errors
    NETWORK_ERROR: 'Please check your internet connection',
    SOMETHING_WRONG: 'Something went wrong. Please try again',
    SERVER_ERROR: 'Server error. Please try again later',
    TIMEOUT_ERROR: 'Request timed out. Please try again',

    // Auth Errors
    UNAUTHORIZED: 'Please login to continue',
    SESSION_EXPIRED: 'Your session has expired. Please login again',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_LOCKED: 'Your account has been locked. Please contact support',

    // Permission Errors
    LOCATION_PERMISSION: 'Location permission is required',
    CAMERA_PERMISSION: 'Camera permission is required',
    GALLERY_PERMISSION: 'Gallery permission is required',
    NOTIFICATION_PERMISSION: 'Notification permission is required',
};