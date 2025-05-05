import { configureStore } from '@reduxjs/toolkit';

import attestatationSlice from './slices/attestationSlice';
import chatSlice from './slices/chatSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        chat: chatSlice,
        attestation: attestatationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
