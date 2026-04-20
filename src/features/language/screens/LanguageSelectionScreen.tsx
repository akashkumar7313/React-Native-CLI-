// src/features/language/screens/LanguageSelectionScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
    Dimensions,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { APP_CONSTANTS } from '../../../shared/constants';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const LanguageSelectionScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
    const [isChanging, setIsChanging] = useState(false);
    const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    const logoScale = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Entrance animation sequence
        Animated.sequence([
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', bgColor: '#FF6B6B' },
        { code: 'hi', name: 'हिन्दी', nativeName: 'Hindi', flag: '🇮🇳', bgColor: '#4ECDC4' },
        { code: 'es', name: 'Español', nativeName: 'Spanish', flag: '🇪🇸', bgColor: '#45B7D1' },
        { code: 'fr', name: 'Français', nativeName: 'French', flag: '🇫🇷', bgColor: '#96CEB4' },
        { code: 'ar', name: 'العربية', nativeName: 'Arabic', flag: '🇸🇦', bgColor: '#FFEAA7' },
    ];

    // Handle language selection - LIVE CHANGE
    const handleLanguageSelect = async (langCode: string) => {
        if (isChanging) return;

        setSelectedLang(langCode);

        // Button press animation
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Change language IMMEDIATELY on click
        try {
            setIsChanging(true);
            await i18n.changeLanguage(langCode);
            setCurrentLang(langCode);
            await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, langCode);
        } catch (error) {
            console.log('Error changing language:', error);
        } finally {
            setIsChanging(false);
        }
    };

    const handleContinue = async () => {
        // Button press animation
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        // Fade out animation before navigation
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            navigation.replace('Onboarding');
        });
    };

    const handleSkip = async () => {
        await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE, 'en');
        navigation.replace('Onboarding');
    };

    const getWelcomeText = () => {
        switch (currentLang) {
            case 'hi': return 'नमस्ते! 👋';
            case 'es': return '¡Hola! 👋';
            case 'fr': return 'Bonjour! 👋';
            case 'ar': return 'مرحباً! 👋';
            default: return 'Hello! 👋';
        }
    };

    // Split languages into rows of 3
    const chunkArray = (arr: any[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const languageRows = chunkArray(languages, 3);

    return (
        <LinearGradient
            colors={['#667eea', '#764ba2', '#f093fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                {isChanging ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Changing language...</Text>
                    </View>
                ) : (
                    <Animated.ScrollView
                        style={[styles.container, { opacity: fadeAnim }]}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Welcome Section */}
                        <Animated.View style={[styles.welcomeSection, { transform: [{ scale: logoScale }] }]}>
                            <View style={styles.welcomeBadge}>
                                <Text style={styles.welcomeEmoji}>🌟</Text>
                            </View>
                            <Text style={styles.welcomeTitle}>{getWelcomeText()}</Text>
                            <Text style={styles.welcomeSubtitle}>
                                {currentLang === 'en' ? 'Choose your preferred language to continue' :
                                    currentLang === 'hi' ? 'जारी रखने के लिए अपनी पसंदीदा भाषा चुनें' :
                                        currentLang === 'es' ? 'Elige tu idioma preferido para continuar' :
                                            currentLang === 'fr' ? 'Choisissez votre langue préférée pour continuer' :
                                                'اختر لغتك المفضلة للمتابعة'}
                            </Text>
                        </Animated.View>

                        {/* Language Options - Grid Layout (3 columns) */}
                        <View style={styles.languageContainer}>
                            <Text style={styles.sectionTitle}>
                                {currentLang === 'en' ? 'Select Language' :
                                    currentLang === 'hi' ? 'भाषा चुनें' :
                                        currentLang === 'es' ? 'Seleccionar idioma' :
                                            currentLang === 'fr' ? 'Choisir la langue' :
                                                'اختر اللغة'}
                            </Text>

                            {languageRows.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.languageRow}>
                                    {row.map((lang) => (
                                        <Animated.View
                                            key={lang.code}
                                            style={[
                                                styles.languageCardWrapper,
                                                {
                                                    opacity: fadeAnim,
                                                    transform: [{ translateY: slideAnim }],
                                                },
                                            ]}
                                        >
                                            <TouchableOpacity
                                                style={[
                                                    styles.languageCard,
                                                    selectedLang === lang.code && styles.selectedLanguageCard,
                                                ]}
                                                onPress={() => handleLanguageSelect(lang.code)}
                                                activeOpacity={0.7}
                                            >
                                                <View style={[styles.flagCircle, { backgroundColor: lang.bgColor + '30' }]}>
                                                    <Text style={styles.flagText}>{lang.flag}</Text>
                                                </View>
                                                <Text style={styles.languageCardName}>{lang.nativeName}</Text>
                                                <Text style={styles.languageCardNative}>{lang.name}</Text>
                                                {selectedLang === lang.code && (
                                                    <View style={styles.cardCheckMark}>
                                                        <Text style={styles.cardCheckText}>✓</Text>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        </Animated.View>
                                    ))}
                                    {/* Fill empty spaces if row has less than 3 items */}
                                    {row.length < 3 && [...Array(3 - row.length)].map((_, i) => (
                                        <View key={`empty-${i}`} style={styles.languageCardWrapper} />
                                    ))}
                                </View>
                            ))}
                        </View>

                        {/* Action Buttons */}
                        <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 20 }}>
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={handleContinue}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#fff', '#f0f0f0']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.continueGradient}
                                >
                                    <Text style={styles.continueText}>
                                        {currentLang === 'en' ? 'Get Started' :
                                            currentLang === 'hi' ? 'शुरू करें' :
                                                currentLang === 'es' ? 'Comenzar' :
                                                    currentLang === 'fr' ? 'Commencer' :
                                                        'ابدأ'}
                                    </Text>
                                    <Text style={styles.continueArrow}>→</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.skipButton}
                                onPress={handleSkip}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skipText}>
                                    {currentLang === 'en' ? 'Skip for now' :
                                        currentLang === 'hi' ? 'अभी के लिए छोड़ें' :
                                            currentLang === 'es' ? 'Saltar por ahora' :
                                                currentLang === 'fr' ? 'Passer pour l\'instant' :
                                                    'تخطي الآن'}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Footer */}
                        <Text style={styles.footerText}>
                            {currentLang === 'en' ? 'You can change language later in settings' :
                                currentLang === 'hi' ? 'आप बाद में सेटिंग्स में भाषा बदल सकते हैं' :
                                    currentLang === 'es' ? 'Puedes cambiar el idioma más tarde en configuración' :
                                        currentLang === 'fr' ? 'Vous pouvez changer la langue plus tard dans les paramètres' :
                                            'يمكنك تغيير اللغة لاحقًا في الإعدادات'}
                        </Text>
                    </Animated.ScrollView>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    welcomeSection: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    welcomeBadge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    welcomeEmoji: {
        fontSize: 45,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 20,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    languageContainer: {
        marginBottom: 20,
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    languageCardWrapper: {
        width: (width - 60) / 3, // 3 cards per row with padding
        marginHorizontal: 5,
    },
    languageCard: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        position: 'relative',
    },
    selectedLanguageCard: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    flagCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    flagText: {
        fontSize: 24,
    },
    languageCardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    languageCardNative: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginTop: 2,
    },
    cardCheckMark: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    cardCheckText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    continueButton: {
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    continueGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        gap: 8,
    },
    continueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#667eea',
    },
    continueArrow: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#667eea',
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    skipText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textDecorationLine: 'underline',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 11,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default LanguageSelectionScreen;