// App Information
export const APP_NAME = 'My Enterprise App';
export const APP_VERSION = '1.0.0';

// Storage Keys (for AsyncStorage)
export const STORAGE_KEYS = {
  TOKEN: '@auth_token',
  USER: '@user_data',
  THEME: '@theme_preference',
  LANGUAGE: '@language',
} as const;

// API Endpoints
export const API_BASE_URL = 'https://api.example.com';

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

// Navigation Routes
export const ROUTES = {
  // Auth Stack
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  OTP: 'OTP',
  FORGOT_PASSWORD: 'ForgotPassword',

  // Main Stack
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  CART: 'Cart',
} as const;

// Colors (Theme)
export const COLORS = {
  primary: '#007AFF',
  secondary: '#6C757D',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  dark: '#343A40',
  light: '#F8F9FA',
  white: '#FFFFFF',
  black: '#000000',
} as const;