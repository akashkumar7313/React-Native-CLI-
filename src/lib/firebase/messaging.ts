import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken, onMessage } from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';

class FirebaseService {
  private static instance: FirebaseService;
  private messaging: any;

  private constructor() {
    try {
      const app = getApp();
      this.messaging = getMessaging(app);
    } catch (error) {
      console.log('Firebase init error:', error);
    }
  }

  static getInstance() {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await getToken(this.messaging);
      console.log('✅ FCM Token:', token);
      return token;
    } catch (error: any) {
      console.log('❌ Error getting token:', error?.message);
      return null;
    }
  }

  onMessage(callback: (message: any) => void) {
    return onMessage(this.messaging, callback);
  }
}

export default FirebaseService.getInstance();
