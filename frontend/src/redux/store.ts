import { configureStore } from '@reduxjs/toolkit';

import { attestationSlice } from '../features/attestation';
import chatSlice from './slices/chatSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
        attestation: attestationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
