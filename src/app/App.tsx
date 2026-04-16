// src/app/App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../core/navigation/RootNavigator';
import { useFirebaseNotification } from '../hooks/useFirebaseNotification';
import { getToken } from '../core/storage/authStorageService';
import { rehydrateAuth } from '../features/auth/redux/authSlice';
import '../core/i18n/i18n';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from '../shared/theme/ThemeProvider';

const App = () => {
  useEffect(() => {
    const bootstrapApp = async () => {
      const token = await getToken();
      if (token) {
        store.dispatch(rehydrateAuth({ token }));
      }
    };
    bootstrapApp();
  }, []);

  useFirebaseNotification();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

const AppContent = () => {
  const { theme, isDarkMode } = useTheme();

  // ✅ Complete navigation theme with all required properties
  const navigationTheme = {
    dark: isDarkMode,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    // 🔥 Add fonts property (required by React Navigation)
    fonts: {
      regular: {
        fontFamily: theme.fonts.regular,
        fontWeight: 'normal' as const,
      },
      medium: {
        fontFamily: theme.fonts.medium,
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: theme.fonts.bold,
        fontWeight: 'bold' as const,
      },
      heavy: {
        fontFamily: theme.fonts.bold,
        fontWeight: '800' as const,
      },
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;