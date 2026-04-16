import { combineReducers } from '@reduxjs/toolkit';
// Import reducers from features
import authReducer from '../features/auth/redux/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;