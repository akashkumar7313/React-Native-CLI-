/**
 * API Configuration
 * This file contains all the configuration for API calls.
 */

// In a real-world app, you would use a library like 'react-native-dotenv'
// to manage different environments (development, staging, production).

// --- MANUAL ENVIRONMENT SWITCH ---
// Set to `false` for Staging/Development URL
// Set to `true` for Production URL
const isProduction = false;

/**
 * The base URL for the API.
 * Changes based on the environment.
 */
export const BASE_URL = isProduction
    ? 'https://api.gharse.net/'
    : 'https://staging.api.lotteryapp.com/v1';

/**
 * API request timeouts in milliseconds.
 */
export const API_TIMEOUTS = {
    CONNECT: 15000, // 15 seconds
    RECEIVE: 15000,
    SEND: 15000,
} as const;

/**
 * Default headers for all API requests.
 */
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
} as const;

/**
 * Generates authentication headers.
 * @param token The authentication token.
 * @returns An object containing the Authorization header.
 */
export const getAuthHeaders = (token: string): Record<string, string> => ({
    Authorization: `Bearer ${token}`,
});

/**
 * Common HTTP status codes.
 */
export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
} as const;

/**
 * Standardized error messages.
 */
export const ERROR_MESSAGES = {
    NETWORK: 'Network error occurred',
    SERVER: 'Server error occurred',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Resource not found',
} as const;