import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from '../../../shared/components/ui/Button/Button';

const OTPScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
                A 4-digit code has been sent to your phone.
            </Text>
            <TextInput style={styles.input} maxLength={4} keyboardType="number-pad" />
            <Button title="Verify" onPress={() => console.log('Verify OTP')} />
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
