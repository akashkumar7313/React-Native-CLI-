import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/theme/ThemeProvider';

const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { theme } = useTheme();
    const { t } = useTranslation();

    const handlePasswordReset = async () => {
        if (!email) {
            Alert.alert(t('error'), t('email_required'));
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(t('password_reset_sent_title'), t('password_reset_sent_subtitle'));
            navigation.goBack();
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_COLORS.background }]}>
            <Text style={[styles.title, { color: theme.APP_COLORS.text }]}>{t('forgot_password_title')}</Text>
            <Text style={[styles.subtitle, { color: theme.APP_COLORS.secondary }]}>{t('forgot_password_subtitle')}</Text>

            <TextInput
                style={[styles.input, { backgroundColor: theme.APP_COLORS.card, color: theme.APP_COLORS.text, borderColor: theme.APP_COLORS.border }]}
                placeholder={t('email_placeholder')}
                placeholderTextColor={theme.APP_COLORS.secondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.APP_COLORS.primary }]}
                onPress={handlePasswordReset}
                disabled={isLoading}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('send_reset_link')}</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
    input: { padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1 },
    button: { padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ForgotPasswordScreen;