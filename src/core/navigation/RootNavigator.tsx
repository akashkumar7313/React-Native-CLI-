import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LoginScreen } from '../../features/auth';

const Stack = createNativeStackNavigator();

// Home Screen
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 App is Running!</Text>
      <Text style={styles.subtitle}>Firebase + Redux + Navigation Ready</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>✅ Firebase Notifications Active</Text>
        <Text style={styles.cardText}>✅ Redux Store Configured</Text>
        <Text style={styles.cardText}>✅ Navigation Setup Complete</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    color: '#007AFF',
    marginVertical: 5,
  },
});

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login Screen' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home Screen' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
