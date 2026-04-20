// src/shared/assets/theme/theme.ts

import { APP_COLORS } from "../constants";


export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 48,
};

export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold' as const,
    },
    h2: {
        fontSize: 28,
        fontWeight: 'bold' as const,
    },
    h3: {
        fontSize: 24,
        fontWeight: '600' as const,
    },
    body: {
        fontSize: 16,
        fontWeight: 'normal' as const,
    },
    caption: {
        fontSize: 12,
        fontWeight: 'normal' as const,
    },
};

// ✅ React Navigation Theme APP_COLORS Type
export type NavigationThemeAPP_COLORS = {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;  // 🔥 Required by React Navigation
};

// ✅ Your App Theme APP_COLORS
export type AppAPP_COLORS = {
    background: string;
    text: string;
    card: string;
    border: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    dark: string;
    light: string;
    white: string;
    black: string;
};

// ✅ Complete Theme Type
export type Theme = {
    spacing: typeof spacing;
    typography: typeof typography;
    APP_COLORS: AppAPP_COLORS;
    dark: boolean;
    fonts: {
        regular: string;
        medium: string;
        bold: string;
        light: string;
    };
    // 🔥 Navigation theme getter
    getNavigationTheme: () => {
        dark: boolean;
        APP_COLORS: NavigationThemeAPP_COLORS;
    };
};

const baseTheme = {
    spacing,
    typography,
    fonts: {
        regular: 'System',
        medium: 'System-Medium',
        bold: 'System-Bold',
        light: 'System-Light',
    },
};

export const lightTheme: Theme = {
    ...baseTheme,
    dark: false,
    APP_COLORS: {
        ...APP_COLORS,
        background: APP_COLORS.light,
        text: APP_COLORS.dark,
        card: APP_COLORS.white,
        border: '#e9ecef',
        primary: APP_COLORS.primary,
        secondary: APP_COLORS.secondary,
        success: APP_COLORS.success,
        danger: APP_COLORS.danger,
        warning: APP_COLORS.warning,
        info: APP_COLORS.info,
        dark: APP_COLORS.dark,
        light: APP_COLORS.light,
        white: APP_COLORS.white,
        black: APP_COLORS.black,
    },
    // 🔥 Add this method
    getNavigationTheme: () => ({
        dark: false,
        APP_COLORS: {
            primary: APP_COLORS.primary,
            background: APP_COLORS.light,
            card: APP_COLORS.white,
            text: APP_COLORS.dark,
            border: '#e9ecef',
            notification: APP_COLORS.primary,  // 🔥 Required property
        },
    }),
};

export const darkTheme: Theme = {
    ...baseTheme,
    dark: true,
    APP_COLORS: {
        ...APP_COLORS,
        background: APP_COLORS.dark,
        text: APP_COLORS.light,
        card: '#424242',
        border: '#616161',
        primary: APP_COLORS.primary,
        secondary: APP_COLORS.secondary,
        success: APP_COLORS.success,
        danger: APP_COLORS.danger,
        warning: APP_COLORS.warning,
        info: APP_COLORS.info,
        dark: APP_COLORS.dark,
        light: APP_COLORS.light,
        white: APP_COLORS.white,
        black: APP_COLORS.black,
    },
    // 🔥 Add this method
    getNavigationTheme: () => ({
        dark: true,
        APP_COLORS: {
            primary: APP_COLORS.primary,
            background: APP_COLORS.dark,
            card: '#424242',
            text: APP_COLORS.light,
            border: '#616161',
            notification: APP_COLORS.primary,  // 🔥 Required property
        },
    }),
};