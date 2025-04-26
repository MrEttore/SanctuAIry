import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import chatSlice from './slices/chatSlice';
import attestatationSlice from './slices/attestationSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
        attestation: attestatationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
