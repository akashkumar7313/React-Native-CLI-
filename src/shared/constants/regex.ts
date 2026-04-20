// src/shared/constants/regex.ts

/**
 * ============================================
 * REGULAR EXPRESSIONS
 * ============================================
 */

export const REGEX = {
    // Email Validation
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Phone Validation (Indian - 10 digits starting with 6,7,8,9)
    PHONE: /^[6-9]\d{9}$/,

    // Password Validation (min 6 characters)
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,

    // Strong Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
    STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,

    // Pincode Validation (Indian - 6 digits)
    PINCODE: /^[1-9][0-9]{5}$/,

    // URL Validation
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,

    // Only Alphabets (A-Z, a-z, spaces)
    ALPHABETS: /^[A-Za-z\s]+$/,

    // Only Numbers
    NUMBERS: /^\d+$/,

    // Alphanumeric (A-Z, a-z, 0-9, spaces)
    ALPHANUMERIC: /^[A-Za-z0-9\s]+$/,

    // PAN Card (India)
    PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,

    // GST Number (India)
    GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,

    // IFSC Code (India)
    IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,

    // Aadhar Card (India - 12 digits)
    AADHAR: /^\d{4}\s?\d{4}\s?\d{4}$/,

    // Credit Card Number (16 digits)
    CREDIT_CARD: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,

    // CVV (3 or 4 digits)
    CVV: /^\d{3,4}$/,

    // Username (3-20 chars, letters, numbers, underscore)
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,

    // Date (DD/MM/YYYY)
    DATE: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,

    // Time (HH:MM)
    TIME: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,

    // Hexadecimal Color (e.g., #FFF, #FFFFFF)
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

    // IP Address (IPv4)
    IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,

    // Slug (URL friendly)
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

    // YouTube URL
    YOUTUBE_URL: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/,

    // Image Extension
    IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|webp|svg)$/i,

    // Video Extension
    VIDEO_EXTENSION: /\.(mp4|mov|avi|wmv|flv|mkv)$/i,

    // Document Extension
    DOC_EXTENSION: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i,

    // Zip File
    ZIP_EXTENSION: /\.(zip|rar|7z|tar|gz)$/i,

    // HTML Tags
    HTML_TAGS: /<[^>]*>/g,

    // Whitespace
    WHITESPACE: /\s/g,

    // Special Characters
    SPECIAL_CHARS: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,

    // Only Letters
    ONLY_LETTERS: /^[A-Za-z]+$/,

    // Only Letters and Spaces
    ONLY_LETTERS_SPACES: /^[A-Za-z\s]+$/,

    // Mobile Number with Country Code
    MOBILE_WITH_COUNTRY: /^(\+\d{1,3}[- ]?)?[6-9]\d{9}$/,

    // OTP (6 digits)
    OTP: /^\d{6}$/,
};

export type RegexType = typeof REGEX;