import { useSelector, useDispatch } from 'react-redux';
import { logout, setLoading, setError, setUser } from '../redux/authSlice';
import type { RootState } from '../../../app/store';
import authAPI from '../services/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONSTANTS } from '../../../shared/constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const login = async (
    username: string,
    password: string,
    rememberMe?: boolean,
    deviceToken?: string
  ) => {
    dispatch(setLoading(true));
    try {
      // ✅ Send device token to API
      const response = await authAPI.login({
        username,
        password,
        rememberMe,
        deviceToken  // ✅ Send as device_token
      });


      if (response?.success === true) {
        if (response?.data?.token) {
          await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, response?.data?.token);
        }

        if (response.data) {
          dispatch(setUser(response.data));
        }

        return { success: true, message: response.message };
      } else {
        const errorMsg = response?.message || 'Login failed';
        dispatch(setError(errorMsg));
        return { success: false, message: errorMsg };
      }
    } catch (error: any) {
      console.log('[useAuth] Error:', error);
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      dispatch(setError(message));
      return { success: false, message };
    } finally {
      dispatch(setLoading(false));
    }
  };



  const signup = async (userData: any) => {
    dispatch(setLoading(true));
    try {
      // Add your signup API call here
      console.log('Signup:', userData);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    try {
      await AsyncStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
      dispatch(logout());
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout: handleLogout,
  };
};
