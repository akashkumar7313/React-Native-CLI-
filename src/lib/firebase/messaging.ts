// src/lib/firebase/messaging.ts
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken as getFCMToken,
  onMessage as onFCMessage,
  requestPermission,
} from '@react-native-firebase/messaging';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

// Get Firebase app instance (auto-initialized from google-services.json)
const app = getApp();
const messaging = getMessaging(app);

/**
 * Requests user permission for notifications and retrieves the FCM token.
 * @returns The FCM token or null if permission is denied or an error occurs.
 */
const getToken = async (): Promise<string | null> => {
  try {
    // On iOS, it will request permission. On Android, it's a no-op.
    await requestPermission(messaging);
    const token = await getFCMToken(messaging);
    console.log('✅ FCM Token:', token);
    return token;
  } catch (error: any) {
    console.log('❌ Error getting FCM token:', error?.message);
    return null;
  }
};

/**
 * Sets up a listener for foreground messages.
 * @param listener The callback function to execute when a message is received.
 * @returns An unsubscribe function.
 */
const onMessage = (
  listener: (message: FirebaseMessagingTypes.RemoteMessage) => any,
) => onFCMessage(messaging, listener);

export const FirebaseService = {
  getToken,
  onMessage,
};