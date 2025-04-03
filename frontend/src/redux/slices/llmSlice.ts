import { createSlice } from '@reduxjs/toolkit';
import { Model } from '../../types/llm';

const initialState: Model = {
  name: 'SanctuAIry 1.0 - 3B',
  description:
    'A balanced general-purpose model fine-tuned for helpfulness and clarity.',
  imageSource:
    'https://hub.docker.com/repository/docker/sanctuairy/llm-core/general',
};

const llmSlice = createSlice({
  name: 'llm',
  initialState,
  reducers: {
    changeModel(state, action) {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.imageSource = action.payload.imageSource;
    },
  },
});

export const { changeModel } = llmSlice.actions;
export default llmSlice.reducer;
