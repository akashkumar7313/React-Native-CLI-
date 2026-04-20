// src/features/language/screens/LanguageSelectionScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { APP_CONSTANTS } from '../../../shared/constants';

const LanguageSelectionScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
        { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    ];

    const handleLanguageSelect = async (langCode: string) => {
        setSelectedLang(langCode);
        await i18n.changeLanguage(langCode);
        await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, langCode);

        // Navigate to Onboarding after language selection
        setTimeout(() => {
            navigation.replace('Onboarding');
        }, 500);
    };

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.APP_COLORS?.primary || '#007AFF', opacity: fadeAnim }]}>
            <StatusBar barStyle="light-content" />

            {/* App Logo */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}>🚀</Text>
                <Text style={styles.appName}>MyApp</Text>
                <Text style={styles.tagline}>Choose your preferred language</Text>
            </View>

            {/* Language Options */}
            <View style={styles.languageContainer}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageOption,
                            selectedLang === lang.code && styles.selectedLanguage,
                            { borderColor: theme.APP_COLORS?.white || '#FFF' }
                        ]}
                        onPress={() => handleLanguageSelect(lang.code)}
                    >
                        <Text style={styles.flag}>{lang.flag}</Text>
                        <View style={styles.languageTextContainer}>
                            <Text style={styles.languageName}>{lang.name}</Text>
                            <Text style={styles.nativeName}>{lang.nativeName}</Text>
                        </View>
                        {selectedLang === lang.code && (
                            <View style={styles.checkMark}>
                                <Text style={styles.checkText}>✓</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.replace('Onboarding')}
            >
                <Text style={styles.continueText}>Continue →</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 50,
    },
    logoEmoji: {
        fontSize: 60,
        marginBottom: 16,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    languageContainer: {
        flex: 1,
        gap: 12,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    selectedLanguage: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
    },
    flag: {
        fontSize: 32,
        marginRight: 16,
    },
    languageTextContainer: {
        flex: 1,
    },
    languageName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    nativeName: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    checkMark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 40,
    },
    continueText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
});

export default LanguageSelectionScreen;