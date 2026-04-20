import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../core/navigation/routes';
import { useTheme } from '../../../shared/theme/ThemeProvider';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('fill_all_fields'));
      return;
    }
    await login(email, password);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en'); // This can be enhanced for more languages
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.APP_COLORS.background }]}>
      <Text style={[styles.title, { color: theme.APP_COLORS.text }]}>{t('welcome')}</Text>

      <View style={styles.switchContainer}>
        <Text style={{ color: theme.APP_COLORS.text }}>{t('toggle_theme')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
        <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
          <Text style={{ color: theme.APP_COLORS.primary }}>{i18n.language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.input, { backgroundColor: theme.APP_COLORS.card, color: theme.APP_COLORS.text, borderColor: theme.APP_COLORS.border }]}
        placeholder={t('email_placeholder')}
        placeholderTextColor={theme.APP_COLORS.secondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.APP_COLORS.card, color: theme.APP_COLORS.text, borderColor: theme.APP_COLORS.border }]}
        placeholder={t('password_placeholder')}
        placeholderTextColor={theme.APP_COLORS.secondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.APP_COLORS.primary }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('login')}</Text>}
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[styles.linkText, { color: theme.APP_COLORS.secondary }]}>{t('forgot_password_q')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
          <Text style={[styles.linkText, { color: theme.APP_COLORS.primary }]}>{t('no_account')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  langButton: { padding: 10 },
  input: { padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1 },
  button: { padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linksContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 10 },
  linkText: { textAlign: 'center' },
});

export default LoginScreen;