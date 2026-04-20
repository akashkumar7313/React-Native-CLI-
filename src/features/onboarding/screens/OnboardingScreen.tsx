// src/features/onboarding/screens/OnboardingScreen.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    Animated,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { APP_CONSTANTS } from '../../../shared/constants';

const { width, height } = Dimensions.get('window');

// ============================================
// Custom Skip Button with Animation
// ============================================
const SkipButton = ({ skipLabel, onPress, isLight }: any) => {
    const { theme } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                style={styles.skipButton}
            >
                <Text style={[styles.skipText, { color: isLight ? '#fff' : '#333' }]}>
                    {skipLabel}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================
// Custom Next Button with Animation
// ============================================
const NextButton = ({ nextLabel, onPress, isLight }: any) => {
    const { theme } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                style={[styles.nextButton, { backgroundColor: isLight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}
            >
                <Text style={[styles.nextText, { color: isLight ? '#fff' : '#333' }]}>
                    {nextLabel}
                </Text>
                <Text style={[styles.nextArrow, { color: isLight ? '#fff' : '#333' }]}>
                    →
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================
// Custom Done Button with Animation
// ============================================
const DoneButton = ({ doneLabel, onPress, isLight }: any) => {
    const { theme } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
                style={[styles.doneButton, { backgroundColor: '#4CAF50' }]}
            >
                <Text style={styles.doneText}>{doneLabel}</Text>
                <Text style={styles.doneIcon}>✓</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

// ============================================
// Custom Dot Component with Animation
// ============================================
const DotComponent = ({ selected, isLight }: any) => {
    const scaleAnim = useRef(new Animated.Value(selected ? 1 : 0.5)).current;

    React.useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: selected ? 1 : 0.5,
            useNativeDriver: true,
        }).start();
    }, [selected]);

    return (
        <Animated.View
            style={[
                styles.dot,
                {
                    backgroundColor: selected
                        ? isLight
                            ? '#fff'
                            : '#333'
                        : isLight
                            ? 'rgba(255,255,255,0.5)'
                            : 'rgba(0,0,0,0.3)',
                    width: selected ? 24 : 8,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        />
    );
};

// ============================================
// Custom Page Component with Animation
// ============================================
const OnboardingPage = ({ title, subtitle, emoji, backgroundColor, isLast }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={[styles.pageContainer, { backgroundColor }]}>
            <StatusBar barStyle="light-content" />

            <Animated.View
                style={[
                    styles.pageContent,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>{emoji}</Text>
                </View>

                <Text style={styles.pageTitle}>{title}</Text>
                <Text style={styles.pageSubtitle}>{subtitle}</Text>

                {!isLast && (
                    <View style={styles.indicator}>
                        <View style={styles.indicatorDot} />
                        <View style={styles.indicatorLine} />
                        <View style={styles.indicatorDot} />
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

// ============================================
// Main Onboarding Screen Component
// ============================================
const OnboardingScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const onboardingRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Save onboarding completion status
    const handleOnboardingComplete = async () => {
        try {
            await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
            navigation.replace('Login');
        } catch (error) {
            console.log('Error saving onboarding status:', error);
            navigation.replace('Login');
        }
    };

    // Pages configuration
    const pages = [
        {
            backgroundColor: theme.APP_COLORS?.primary || '#007AFF',
            image: (
                <OnboardingPage
                    title={t('onboarding_title_1', 'Welcome to MyApp')}
                    subtitle={t('onboarding_subtitle_1', 'Discover amazing features and improve your experience')}
                    emoji="🚀"
                    backgroundColor={theme.APP_COLORS?.primary || '#007AFF'}
                />
            ),
            title: '',
            subtitle: '',
        },
        {
            backgroundColor: '#6C63FF',
            image: (
                <OnboardingPage
                    title={t('onboarding_title_2', 'Fast & Secure')}
                    subtitle={t('onboarding_subtitle_2', 'Your data is always protected with us')}
                    emoji="✨"
                    backgroundColor="#6C63FF"
                />
            ),
            title: '',
            subtitle: '',
        },
        {
            backgroundColor: '#FF6584',
            image: (
                <OnboardingPage
                    title={t('onboarding_title_3', 'Get Started')}
                    subtitle={t('onboarding_subtitle_3', 'Join thousands of happy users today')}
                    emoji="🎉"
                    backgroundColor="#FF6584"
                    isLast={true}
                />
            ),
            title: '',
            subtitle: '',
        },
    ];

    return (
        <Onboarding
            ref={onboardingRef}
            pages={pages}
            onDone={handleOnboardingComplete}
            onSkip={handleOnboardingComplete}
            SkipButtonComponent={SkipButton}
            NextButtonComponent={NextButton}
            DoneButtonComponent={DoneButton}
            DotComponent={DotComponent}
            skipLabel={t('skip', 'Skip')}
            nextLabel={t('next', 'Next')}
            doneLabel={t('done', 'Done')}
            bottomBarHighlight={false}
            showSkip={true}
            showNext={true}
            showDone={true}
            controlStatusBar={true}
            pageIndexCallback={(index: number) => setCurrentPage(index)}
        />
    );
};

// ============================================
// Styles
// ============================================
const styles = StyleSheet.create({
    // Button Styles
    skipButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginLeft: 20,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '500',
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 20,
        borderRadius: 25,
    },
    nextText: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 5,
    },
    nextArrow: {
        fontSize: 18,
        fontWeight: '600',
    },
    doneButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 20,
        borderRadius: 25,
    },
    doneText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginRight: 5,
    },
    doneIcon: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },

    // Page Styles
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContent: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    emojiContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    emoji: {
        fontSize: 70,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    pageSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    indicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
    indicatorDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    indicatorLine: {
        width: 30,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 8,
    },
});

export default OnboardingScreen;