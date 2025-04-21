import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Model } from '../../types/llm';
import { RootState } from '../store';

const initialState: Model = {
    name: 'SanctuAIry 1.0 - 3B', // TODO: Remove later.
    model: '',
    modified_at: '',
    size: 0,
    digest: '',
    imageSource:
        'https://hub.docker.com/repository/docker/sanctuairy/llm-core/general',
    details: {
        parent_model: '',
        format: '',
        family: '',
        families: [],
        parameter_size: '',
        quantization_level: '',
    },
};

const llmSlice = createSlice({
    name: 'llm',
    initialState,
    reducers: {
        selectModel(state, action: PayloadAction<Model>) {
            state.name = action.payload.name;
            state.model = action.payload.model;
            state.modified_at = action.payload.modified_at;
            state.size = action.payload.size;
            state.digest = action.payload.digest;
            state.imageSource = action.payload.imageSource;
            state.details = action.payload.details;
        },
    },
});

export const getModel = (state: RootState) => state.llm;

export const { selectModel } = llmSlice.actions;
export default llmSlice.reducer;
