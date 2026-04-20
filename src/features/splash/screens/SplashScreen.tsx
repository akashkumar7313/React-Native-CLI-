import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    StatusBar,
} from 'react-native';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const fadeOut = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Bounce animation
        Animated.spring(bounceAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();

        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Fade out and navigate
        setTimeout(() => {
            Animated.timing(fadeOut, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                if (onFinish) onFinish();
            });
        }, 2500);
    }, []);

    const bounce = bounceAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.2, 1],
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeOut, backgroundColor: theme.APP_COLORS?.primary || '#0F172A' }]}>
            <StatusBar hidden />

            <View style={styles.content}>
                <Animated.Text
                    style={[
                        styles.emoji,
                        {
                            transform: [{ scale: bounce }],
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    🚀
                </Animated.Text>

                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={[styles.title, { color: theme.APP_COLORS?.white || '#FFF' }]}>
                        {t('splash_title', 'Welcome to MyApp')}
                    </Text>

                    <Text style={[styles.slogan, { color: theme.APP_COLORS?.text || '#94A3B8' }]}>
                        {t('splash_tagline', 'Your journey to something amazing starts here.')}
                    </Text>
                </Animated.View>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: theme.APP_COLORS?.text || '#475569' }]}>
                    Version 1.0.0
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        letterSpacing: 1,
        textAlign: 'center',
    },
    slogan: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        fontSize: 12,
    },
});

export default SplashScreen;