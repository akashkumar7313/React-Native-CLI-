import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToken, removeToken } from '../../../core/storage/authStorageService';

export interface AuthState {
  user: null | any;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save token to persistent storage
      saveToken(action.payload.token);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      // Remove token from persistent storage
      removeToken();
    },
    rehydrateAuth: (state, action: PayloadAction<{ token: string | null }>) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { setUser, loginSuccess, setLoading, setError, logout, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
