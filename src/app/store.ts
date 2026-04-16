import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// Create Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For Firebase & navigation
    }),
});

// Type for RootState (use in useSelector)
export type RootState = ReturnType<typeof store.getState>;

// Type for AppDispatch (use in useDispatch)
export type AppDispatch = typeof store.dispatch;