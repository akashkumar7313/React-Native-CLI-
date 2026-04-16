import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const useNotifications = () => {
    useEffect(() => {
        const initialize = async () => {
            try {
                // 1. Request Permissions
                if (Platform.OS === 'ios' || Platform.OS === 'android') {
                    const authStatus = await messaging().requestPermission();
                    const enabled =
                        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                    if (!enabled) {
                        console.log('Notification permissions not granted.');
                        return;
                    }
                }

                // 2. Get FCM Token
                const fcmToken = await messaging().getToken();
                console.log('📱 FCM Token:', fcmToken);

                // 3. Listen for foreground messages
                const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                    console.log('📨 Foreground message received:', remoteMessage);
                    Alert.alert(
                        remoteMessage.notification?.title || 'New Notification',
                        remoteMessage.notification?.body || ''
                    );
                });

                return unsubscribe;
            } catch (error: any) {
                console.error('❌ Notification setup error:', error.message);
            }
        };

        initialize();
    }, []);
};