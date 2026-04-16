// Export all public APIs for auth feature
export { default as LoginScreen } from './screens/LoginScreen'; // Assuming this file exists
export { default as SignupScreen } from './screens/SignupScreen'; // Assuming this file exists
export { default as OTPScreen } from './screens/OTPScreen'; // Assuming this file exists
export { useAuth } from './hooks/useAuth'; // This will now correctly resolve to useAuth.ts
export { default as authReducer } from './redux/authSlice'; // This will now correctly resolve to authSlice.ts
export type { User, AuthState } from './types/auth.types';
