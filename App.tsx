import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, getToken } from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const getTokenModular = async () => {
      try {
        // ✅ Modular API - Auto-read from google-services.json
        const app = getApp(); // Default app auto-initialized from JSON
        const messaging = getMessaging(app);
        const token = await getToken(messaging);

        console.log("✅ FCM Token (Modular):", token);
        Alert.alert("Success", "Firebase connected with Modular API!");
      } catch (error: any) {
        console.log("❌ Error:", error?.message);
        Alert.alert("Error", error?.message);
      }
    };

    getTokenModular();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Firebase Modular API ✅</Text>
      <Text style={{ marginTop: 10 }}>Check console for token</Text>
    </View>
  );
};

export default App;