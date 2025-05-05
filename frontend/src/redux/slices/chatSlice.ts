import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Chat } from '../../types/chat';
import { Model } from '../../types/llm';
import { RootState } from '../store';

const initialState: Chat = {
    currentPrompt: null,
    messages: [],
    model: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectModel(state, action: PayloadAction<Model>) {
            state.model = action.payload;
        },
    },
});

export const getModel = (state: RootState) => state.chat.model;

export const { selectModel } = chatSlice.actions;
export default chatSlice.reducer;
