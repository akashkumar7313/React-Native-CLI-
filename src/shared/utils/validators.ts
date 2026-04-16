// src/shared/utils/validators.ts

/**
 * ============================================
 * EMAIL VALIDATION
 * ============================================
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * ============================================
 * PHONE VALIDATION (Indian - 10 digits starting with 6-9)
 * ============================================
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

/**
 * ============================================
 * PASSWORD VALIDATION
 * ============================================
 */
export const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
};

export const isStrongPassword = (password: string): boolean => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return strongRegex.test(password);
};

/**
 * ============================================
 * NAME VALIDATION
 * ============================================
 */
export const isValidName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 50;
};

/**
 * ============================================
 * PINCODE VALIDATION (Indian - 6 digits)
 * ============================================
 */
export const isValidPincode = (pincode: string): boolean => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
};

/**
 * ============================================
 * URL VALIDATION
 * ============================================
 */
export const isValidUrl = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(url);
};

/**
 * ============================================
 * PAN CARD VALIDATION (India)
 * ============================================
 */
export const isValidPan = (pan: string): boolean => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
};

/**
 * ============================================
 * GST VALIDATION (India)
 * ============================================
 */
export const isValidGST = (gst: string): boolean => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
};

/**
 * ============================================
 * COMMON VALIDATIONS
 * ============================================
 */
export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

export const isNumber = (value: string): boolean => {
    return /^\d+$/.test(value);
};

export const isAlphabet = (value: string): boolean => {
    return /^[A-Za-z\s]+$/.test(value);
};

export const isAlphanumeric = (value: string): boolean => {
    return /^[A-Za-z0-9\s]+$/.test(value);
};