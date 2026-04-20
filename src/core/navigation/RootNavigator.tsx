import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LoginScreen, SignupScreen } from '../../features/auth';
import OnboardingScreen from '../../features/onboarding/screens/OnboardingScreen';
import LanguageSelectionScreen from '../../features/language/screens/LanguageSelectionScreen';
import SplashScreen from '../../features/splash/screens/SplashScreen';
import OTPScreen from '../../features/auth/screens/OTPScreen';
import ForgotPasswordScreen from '../../features/auth/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

// Home Screen
const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('app_running_title')}</Text>
      <Text style={styles.subtitle}>{t('app_running_subtitle')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>✅ Firebase Notifications Active</Text>
        <Text style={styles.cardText}>✅ Redux Store Configured</Text>
        <Text style={styles.cardText}>✅ Navigation Setup Complete</Text>
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
        children={({ navigation }) => (
          <SplashScreen onFinish={() => navigation.replace('LanguageSelection')} />
        )}
        options={{ title: 'Splash Screen' }}
      />
      <Stack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
        options={{ title: 'Language Selection Screen' }}
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
