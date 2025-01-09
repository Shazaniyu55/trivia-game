// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import Reducer from './Slice';

export const store = configureStore({
  reducer: {
    app: Reducer, // Add your reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself (for TypeScript users)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
