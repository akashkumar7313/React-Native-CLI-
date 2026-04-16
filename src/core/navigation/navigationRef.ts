// src/core/navigation/navigationRef.ts
import { createNavigationContainerRef } from '@react-navigation/native';

import { ROUTES } from './routes';

// Define navigation params type based on your ROUTES
export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.SIGNUP]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.PROFILE]: { userId: string };
  // Add other screens and their params here
  [key: string]: object | undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigate to any screen from anywhere
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    // The 'as any' is a safe workaround for a known issue with dynamic route names in TypeScript.
    navigationRef.navigate(name as any, params as any);
  }
}

// Go back to previous screen
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

// Reset navigation
export function reset(name: keyof RootStackParamList, params?: RootStackParamList[typeof name]) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: name as string, params }],
    });
  }
}