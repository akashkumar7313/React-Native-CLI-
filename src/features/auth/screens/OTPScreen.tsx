import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '../../../shared/components/ui/Button/Button';
import { useTheme } from '../../../shared/theme/ThemeProvider';

const OTPScreen = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.APP_COLORS.background }]}>
            <Text style={[styles.title, { color: theme.APP_COLORS.text }]}>{t('enter_otp')}</Text>
            <Text style={[styles.subtitle, { color: theme.APP_COLORS.secondary }]}>
                {t('otp_subtitle')}
            </Text>
            <TextInput
                style={[styles.input, {
                    color: theme.APP_COLORS.text,
                    borderColor: theme.APP_COLORS.border,
                    backgroundColor: theme.APP_COLORS.card
                }]}
                maxLength={4}
                keyboardType="number-pad"
            />
            <Button title={t('verify')} onPress={() => console.log('Verify OTP')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: 'gray' },
    input: {
        borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, fontSize: 18, textAlign: 'center', marginBottom: 20
    }
});

export default OTPScreen;
