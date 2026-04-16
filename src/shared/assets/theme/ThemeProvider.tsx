import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from './theme';
import { STORAGE_KEYS } from '../../../utils/constants';

type ThemeContextType = {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const deviceScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(deviceScheme === 'dark');

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
                if (savedTheme !== null) {
                    setIsDarkMode(savedTheme === 'dark');
                }
            } catch (error) {
                console.error('Failed to load theme from storage.', error);
            }
        };
        loadThemePreference();
    }, []);

    const toggleTheme = async () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.THEME, newIsDarkMode ? 'dark' : 'light');
        } catch (error) {
            console.error('Failed to save theme to storage.', error);
        }
    };

    const theme: Theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
