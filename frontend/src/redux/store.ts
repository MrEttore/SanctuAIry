import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import llmSlice from './slices/llmSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    llm: llmSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
