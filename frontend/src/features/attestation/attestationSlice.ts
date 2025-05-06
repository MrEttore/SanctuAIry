import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../redux/store';
import {
    AttestationQuote,
    AttestationState,
    UpdateStepPayload,
} from '../../types/attestation';

const initialState: AttestationState = {
    issuedChallenge: null,
    attestationQuote: null,
    attestationSteps: {
        issueChallenge: {
            status: 'idle',
        },
        generateEvidence: {
            status: 'idle',
        },
        verifyTee: {
            status: 'idle',
        },
        validateImage: {
            status: 'idle',
        },
        signResult: {
            status: 'idle',
        },
    },
};

const attestationSlice = createSlice({
    name: 'attestation',
    initialState,
    reducers: {
        setIssuedChallenge(state, action: PayloadAction<string>) {
            state.issuedChallenge = action.payload;
        },
        setAttestationQuote(state, action: PayloadAction<AttestationQuote>) {
            state.attestationQuote = action.payload;
        },

        updateStep(state, action: PayloadAction<UpdateStepPayload>) {
            const { step, status } = action.payload;
            state.attestationSteps[step].status = status;
        },
    },
});

export const getAttestationSteps = (state: RootState) =>
    state.attestation.attestationSteps;
export const getIssuedChallenge = (state: RootState) =>
    state.attestation.issuedChallenge;
export const getAttestationQuote = (state: RootState) =>
    state.attestation.attestationQuote;

export const { setIssuedChallenge, setAttestationQuote, updateStep } =
    attestationSlice.actions;
export default attestationSlice.reducer;
