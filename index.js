/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import App from './src/app/App';
import { name as appName } from './app.json';

// Modular API - नया तरीका
const app = getApp();
const messaging = getMessaging(app);

// Background message handler
setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('📱 Background notification:', remoteMessage);
    // You can add custom logic here
});

AppRegistry.registerComponent(appName, () => App);