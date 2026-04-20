// src/shared/utils/validators.ts

import { REGEX } from '../constants/regex';

/**
 * ============================================
 * EMAIL VALIDATION
 * ============================================
 */
export const isValidEmail = (email: string): boolean => {
    return REGEX.EMAIL.test(email);
};

/**
 * ============================================
 * PHONE VALIDATION (Indian - 10 digits starting with 6-9)
 * ============================================
 */
export const isValidPhone = (phone: string): boolean => {
    return REGEX.PHONE.test(phone);
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
    return REGEX.STRONG_PASSWORD.test(password);
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
    return REGEX.PINCODE.test(pincode);
};

/**
 * ============================================
 * URL VALIDATION
 * ============================================
 */
export const isValidUrl = (url: string): boolean => {
    return REGEX.URL.test(url);
};

/**
 * ============================================
 * PAN CARD VALIDATION (India)
 * ============================================
 */
export const isValidPan = (pan: string): boolean => {
    return REGEX.PAN.test(pan);
};

/**
 * ============================================
 * GST VALIDATION (India)
 * ============================================
 */
export const isValidGST = (gst: string): boolean => {
    return REGEX.GST.test(gst);
};

/**
 * ============================================
 * IFSC CODE VALIDATION
 * ============================================
 */
export const isValidIFSC = (ifsc: string): boolean => {
    return REGEX.IFSC.test(ifsc);
};

/**
 * ============================================
 * AADHAR VALIDATION
 * ============================================
 */
export const isValidAadhar = (aadhar: string): boolean => {
    return REGEX.AADHAR.test(aadhar);
};

/**
 * ============================================
 * OTP VALIDATION (6 digits)
 * ============================================
 */
export const isValidOTP = (otp: string): boolean => {
    return REGEX.OTP.test(otp);
};

/**
 * ============================================
 * USERNAME VALIDATION
 * ============================================
 */
export const isValidUsername = (username: string): boolean => {
    return REGEX.USERNAME.test(username);
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
    return REGEX.NUMBERS.test(value);
};

export const isAlphabet = (value: string): boolean => {
    return REGEX.ALPHABETS.test(value);
};

export const isAlphanumeric = (value: string): boolean => {
    return REGEX.ALPHANUMERIC.test(value);
};

/**
 * ============================================
 * CREDIT CARD VALIDATION
 * ============================================
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
    return REGEX.CREDIT_CARD.test(cardNumber);
};

/**
 * ============================================
 * CVV VALIDATION
 * ============================================
 */
export const isValidCVV = (cvv: string): boolean => {
    return REGEX.CVV.test(cvv);
};

/**
 * ============================================
 * DATE VALIDATION (DD/MM/YYYY)
 * ============================================
 */
export const isValidDate = (date: string): boolean => {
    return REGEX.DATE.test(date);
};