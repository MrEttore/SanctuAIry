import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import llmSlice from './slices/llmSlice';
import attestatationSlice from './slices/attestationSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        llm: llmSlice,
        attestation: attestatationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
