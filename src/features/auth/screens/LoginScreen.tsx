import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../core/navigation/routes';
import { useTheme } from '../../../shared/theme/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_IMAGES, APP_CONSTANTS } from '../../../shared/constants';
import { FirebaseService } from '../../../lib/firebase/messaging';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogin = async () => {
    // ✅ Validation - Translation use करें
    if (!email || !password) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }

    try {
      // ✅ Step 1: Get FCM Token for push notifications
      const deviceToken = await FirebaseService.getToken();
      console.log('Device Token:', deviceToken);

      const token = deviceToken || undefined;

      // ✅ Call login API with device token
      const result = await login(email, password, false, token);

      if (result?.success === true) {
        Alert.alert(t('success'), t('login_success'));
        navigation.replace('Home');
      } else {
        Alert.alert(t('error'), result?.message || t('login_failed'));
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert(t('error'), t('something_went_wrong'));
    }
  };


  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a2e', '#16213e', '#0f3460'] : ['#667eea', '#764ba2', '#f093fb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <Image source={APP_IMAGES.APP_LOGO} style={styles.logo} />
              </View>
              <Text style={styles.welcomeText}>{t('welcome')}</Text>
              <Text style={styles.subtitleText}>
                {t('login_subtitle')}
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Email Input */}
              <View style={[styles.inputWrapper, emailFocused && styles.inputFocused]}>
                <Text style={styles.inputLabel}>{t('email_label')}</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>✉️</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t('email_placeholder')}
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={[styles.inputWrapper, passwordFocused && styles.inputFocused]}>
                <Text style={styles.inputLabel}>{t('password_label')}</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder={t('password_placeholder')}
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password Link */}
              <TouchableOpacity
                style={styles.forgotLink}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>{t('forgot_password_q')}</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#ff6b6b', '#ee5a24']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>{t('login')}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>{t('no_account')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
                  <Text style={styles.signupLink}>{t('signup_link')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer Section with Controls */}
            <View style={styles.footerSection}>
              <Text style={styles.versionText}>{t('version')} 1.0.0</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logo: {
    width: 70,
    height: 70,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputFocused: {
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  inputLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    fontSize: 18,
    opacity: 0.7,
    padding: 5,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  signupLink: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerSection: {
    marginTop: 'auto',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  controlIcon: {
    fontSize: 16,
  },
  controlText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  versionText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
});

export default LoginScreen;