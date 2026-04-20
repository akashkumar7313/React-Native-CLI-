import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/theme/ThemeProvider';

const SignupScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = () => {
        if (!name || !email || !password) {
            Alert.alert(t('error'), t('fill_all_fields'));
            return;
        }
        setIsLoading(true);
        // Simulate signup API call
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(t('account_created_title'), t('account_created_subtitle'));
            navigation.navigate('OTPScreen');
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_COLORS.background }]}>
            <Text style={[styles.title, { color: theme.APP_COLORS.text }]}>{t('create_account')}</Text>

            <TextInput
                style={[styles.input, { backgroundColor: theme.APP_COLORS.card, color: theme.APP_COLORS.text, borderColor: theme.APP_COLORS.border }]}
                placeholder={t('name_placeholder')}
                placeholderTextColor={theme.APP_COLORS.secondary}
                value={name}
                onChangeText={setName}
            />
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
                onPress={handleSignup}
                disabled={isLoading}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{t('create_account')}</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    input: { padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1 },
    button: { padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default SignupScreen;