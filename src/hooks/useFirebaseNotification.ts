import { useEffect, useState } from 'react';
import firebaseService from '../lib/firebase/messaging';
import { Alert } from 'react-native';

export const useFirebaseNotification = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const token = await firebaseService.getToken();
      setFcmToken(token);

      firebaseService.onMessage((message) => {
        console.log('📨 New message:', message);
        Alert.alert(
          message.notification?.title || 'Notification',
          message.notification?.body || ''
        );
      });
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { fcmToken, loading };
};
