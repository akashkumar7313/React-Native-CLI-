// src/core/i18n/i18n.ts
import i18n from 'i18next';
import 'intl-pluralrules'; // 👈 Add this polyfill
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS } from '../../shared/constants';
import en from './locales/en.json';
import hi from './locales/hi.json';
import es from './locales/es.json';  // Add Spanish
import fr from './locales/fr.json';  // Add French
import ar from './locales/ar.json';  // Add Arabic

export const resources = {
    en: { translation: en },
    hi: { translation: hi },
    es: { translation: es },  // Add
    fr: { translation: fr },  // Add
    ar: { translation: ar },
} as const;

const languageDetector = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lang: string) => void) => {
        try {
            const savedLang = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE);
            // If a language is saved, use it. Otherwise, default to 'en'.
            callback(savedLang || 'en');
        } catch (error) {
            console.log('Error reading language from AsyncStorage:', error);
            callback('en'); // Fallback to English on error
        }
    },
    init: () => { },
    cacheUserLanguage: (lng: string) => {
        AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, lng);
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        // Add this section for React Native
        react: {
            useSuspense: false,
        },
    });

export default i18n;