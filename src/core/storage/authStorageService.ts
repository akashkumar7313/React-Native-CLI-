import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../shared/utils/constants';

/**
 * Saves the authentication token to secure storage.
 * @param token The token to save.
 */
export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
        console.error('Failed to save the auth token to storage', error);
    }
};

/**
 * Retrieves the authentication token from secure storage.
 * @returns The token, or null if it doesn't exist.
 */
export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Failed to fetch the auth token from storage', error);
        return null;
    }
};

/**
 * Removes the authentication token from secure storage.
 */
export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
        console.error('Failed to remove the auth token from storage', error);
    }
};
