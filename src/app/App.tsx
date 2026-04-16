import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../core/navigation/RootNavigator';
import { useFirebaseNotification } from '../hooks/useFirebaseNotification';
import { getToken } from '../core/storage/authStorageService';
import { rehydrateAuth } from '../features/auth/redux/authSlice';

const App = () => {
  useEffect(() => {
    const bootstrapApp = async () => {
      // Attempt to load token from storage on app start
      const token = await getToken();
      if (token) {
        store.dispatch(rehydrateAuth({ token }));
      }
    };

    bootstrapApp();
  }, []);

  // This hook handles all notification logic:
  // 1. Initializes Firebase messaging.
  // 2. Gets the FCM token.
  // 3. Listens for foreground messages.
  useFirebaseNotification();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;