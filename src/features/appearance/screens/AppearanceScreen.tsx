import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS } from '../../../shared/constants';

const { width } = Dimensions.get('window');

const AppearanceScreen = ({ navigation }: any) => {
    const { theme, isDarkMode, setThemePreference, themePreference } = useTheme();
    const { t } = useTranslation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleSelectAppearance = (appearance: 'light' | 'dark' | 'system') => {
        setThemePreference(appearance);
    };

    const handleContinue = async () => {
        // Ensure theme is saved even if user just hits continue with default
        if (!await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.THEME)) {
            await setThemePreference(themePreference);
        }

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            navigation.replace('Onboarding');
        });
    };

    const options = [
        { key: 'light', label: t('light_mode', 'Light Mode'), icon: '☀️' },
        { key: 'dark', label: t('dark_mode', 'Dark Mode'), icon: '🌙' },
        { key: 'system', label: t('system_default', 'System Default'), icon: '⚙️' },
    ];

    return (
        <LinearGradient
            colors={isDarkMode ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#89f7fe', '#66a6ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
                <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                    <Animated.View style={[styles.header, { transform: [{ translateY: slideAnim }] }]}>
                        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1a2a6c' }]}>
                            {t('choose_appearance', 'Choose Your Appearance')}
                        </Text>
                        <Text style={[styles.subtitle, { color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#2e4a8d' }]}>
                            {t('appearance_subtitle', "Select how you'd like your app to look. You can change this later in settings.")}
                        </Text>
                    </Animated.View>

                    <View style={styles.optionsContainer}>
                        {options.map((option) => (
                            <Animated.View
                                key={option.key}
                                style={{ transform: [{ translateY: slideAnim }] }}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.optionCard,
                                        themePreference === option.key && styles.selectedOptionCard,
                                        {
                                            backgroundColor: isDarkMode
                                                ? (themePreference === option.key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)')
                                                : (themePreference === option.key ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)')
                                        }
                                    ]}
                                    onPress={() => handleSelectAppearance(option.key as 'light' | 'dark' | 'system')}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.optionIcon}>{option.icon}</Text>
                                    <Text style={[styles.optionLabel, { color: isDarkMode ? '#fff' : '#1a2a6c' }]}>{option.label}</Text>
                                    {themePreference === option.key && (
                                        <View style={styles.checkMark}>
                                            <Text style={styles.checkMarkText}>✓</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.continueText, { color: '#1a2a6c' }]}>
                                {t('continue', 'Continue')}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a2a6c',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#2e4a8d',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedOptionCard: {
        borderColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a2a6c',
    },
    checkMark: {
        position: 'absolute',
        right: 16,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#34c759',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMarkText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 50,
    },
    continueButton: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    continueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a2a6c',
    },
});

export default AppearanceScreen;