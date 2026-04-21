import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme } from './theme';
import { APP_CONSTANTS } from '../../shared/constants';

const { STORAGE_KEYS } = APP_CONSTANTS;

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextType = {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => void;
    themePreference: ThemePreference;
    setThemePreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const deviceScheme = useColorScheme();
    const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME) as ThemePreference | null;
                if (savedTheme !== null) {
                    setThemePreferenceState(savedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme from storage.', error);
            }
        };
        loadThemePreference();
    }, []);

    const isDarkMode = themePreference === 'system' ? deviceScheme === 'dark' : themePreference === 'dark';

    const setThemePreference = async (preference: ThemePreference) => {
        setThemePreferenceState(preference);
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.THEME, preference);
            console.log(`[ThemeProvider] Saved theme preference: ${preference}`);
        } catch (error) {
            console.error('Failed to save theme preference to storage.', error);
        }
    };

    const toggleTheme = async () => {
        // This function will now toggle between light and dark, and set the preference explicitly, overriding 'system'
        const newPreference = isDarkMode ? 'light' : 'dark';
        setThemePreferenceState(newPreference);
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.THEME, newPreference);
        } catch (error) {
            console.error('Failed to save theme to storage.', error);
        }
    };

    const theme: Theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, themePreference, setThemePreference }}>
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
