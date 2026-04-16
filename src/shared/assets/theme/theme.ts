// src/shared/assets/theme/theme.ts
import { COLORS } from "../colors/colors";

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

// ✅ React Navigation Theme Colors Type
export type NavigationThemeColors = {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;  // 🔥 Required by React Navigation
};

// ✅ Your App Theme Colors
export type AppColors = {
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
    colors: AppColors;
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
        colors: NavigationThemeColors;
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
    colors: {
        ...COLORS,
        background: COLORS.light,
        text: COLORS.dark,
        card: COLORS.white,
        border: '#e9ecef',
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        success: COLORS.success,
        danger: COLORS.danger,
        warning: COLORS.warning,
        info: COLORS.info,
        dark: COLORS.dark,
        light: COLORS.light,
        white: COLORS.white,
        black: COLORS.black,
    },
    // 🔥 Add this method
    getNavigationTheme: () => ({
        dark: false,
        colors: {
            primary: COLORS.primary,
            background: COLORS.light,
            card: COLORS.white,
            text: COLORS.dark,
            border: '#e9ecef',
            notification: COLORS.primary,  // 🔥 Required property
        },
    }),
};

export const darkTheme: Theme = {
    ...baseTheme,
    dark: true,
    colors: {
        ...COLORS,
        background: COLORS.dark,
        text: COLORS.light,
        card: '#424242',
        border: '#616161',
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        success: COLORS.success,
        danger: COLORS.danger,
        warning: COLORS.warning,
        info: COLORS.info,
        dark: COLORS.dark,
        light: COLORS.light,
        white: COLORS.white,
        black: COLORS.black,
    },
    // 🔥 Add this method
    getNavigationTheme: () => ({
        dark: true,
        colors: {
            primary: COLORS.primary,
            background: COLORS.dark,
            card: '#424242',
            text: COLORS.light,
            border: '#616161',
            notification: COLORS.primary,  // 🔥 Required property
        },
    }),
};