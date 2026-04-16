import { COLORS } from "../colors/colors";


export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
};

export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        fontSize: 16,
    },
};

const baseTheme = {
    spacing,
    typography,
};

export const lightTheme = {
    ...baseTheme,
    colors: {
        ...COLORS,
        background: COLORS.light,
        text: COLORS.dark,
        card: COLORS.white,
        border: '#e9ecef',
    },
};

export const darkTheme = {
    ...baseTheme,
    colors: {
        ...COLORS,
        background: COLORS.dark,
        text: COLORS.light,
        card: '#424242',
        border: '#616161',
    },
};

export type Theme = typeof lightTheme;
