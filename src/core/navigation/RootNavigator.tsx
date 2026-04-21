import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS } from '../../shared/constants';
import { LoginScreen, SignupScreen } from '../../features/auth';
import OnboardingScreen from '../../features/onboarding/screens/OnboardingScreen';
import LanguageSelectionScreen from '../../features/language/screens/LanguageSelectionScreen';
import SplashScreen from '../../features/splash/screens/SplashScreen';
import OTPScreen from '../../features/auth/screens/OTPScreen';
import ForgotPasswordScreen from '../../features/auth/screens/ForgotPasswordScreen';
import { useTheme } from '../../shared/theme/ThemeProvider';
import AppearanceScreen from '../../features/appearance/screens/AppearanceScreen';

const Stack = createNativeStackNavigator();

// Home Screen
const HomeScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.APP_COLORS.background }]}>
      <Text style={[styles.title, { color: theme.APP_COLORS.text }]}>{t('app_running_title')}</Text>
      <Text style={[styles.subtitle, { color: theme.APP_COLORS.secondary }]}>{t('app_running_subtitle')}</Text>
      <View style={[styles.card, { backgroundColor: theme.APP_COLORS.card }]}>
        <Text style={styles.cardText}>{t('firebase_notif_active')}</Text>
        <Text style={styles.cardText}>{t('redux_configured')}</Text>
        <Text style={styles.cardText}>{t('nav_setup_complete')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    color: '#007AFF',
    marginVertical: 5,
  },
});

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Splash"
        // eslint-disable-next-line react/no-unstable-nested-components
        children={({ navigation }) => {
          const handleFinish = async () => {
            const language = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.LANGUAGE);
            const themePref = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.THEME);
            const onboarding = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.ONBOARDING_COMPLETED);

            console.log('[Splash] Language in storage:', language);
            console.log('[Splash] Theme in storage:', themePref);
            console.log('[Splash] Onboarding status:', onboarding);

            if (!language) {
              navigation.replace('LanguageSelection');
            } else if (!themePref) {
              navigation.replace('Appearance');
            } else if (!onboarding) {
              navigation.replace('Onboarding');
            } else {
              navigation.replace('Login');
            }
          };
          return <SplashScreen onFinish={handleFinish} />;
        }}
        options={{ title: 'Splash Screen' }}
      />
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
        options={{ title: 'Language Selection Screen' }}
      />
      <Stack.Screen
        name="Appearance"
        component={AppearanceScreen}
        options={{ title: 'Appearance Screen' }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ title: 'Onboarding Screen' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login Screen' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password', headerShown: true, headerBackTitle: 'Login' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Sign Up', headerShown: true, headerBackTitle: 'Login' }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ title: 'Verify OTP', headerShown: true, headerBackTitle: 'Back' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Screen' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
