// src/core/navigation/navigationRef.ts
import { createNavigationContainerRef } from '@react-navigation/native';

// Define navigation params type
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: { userId: string };
  Product: { id: string; name: string };
  // Add more screens as needed
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigate to any screen from anywhere
export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    // @ts-ignore - TypeScript workaround
    navigationRef.navigate(name, params);
  }
}

// Go back to previous screen
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

// Reset navigation
export function reset(name: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name } as any],
    });
  }
}