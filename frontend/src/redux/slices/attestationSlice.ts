import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttestationState } from '../../types/attestation';

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
        setAttestationQuote(state, action: PayloadAction<object>) {
            state.attestationQuote = action.payload;
        },

        // TODO: Rename.
        updateStep(
            state,
            action: PayloadAction<'idle' | 'pending' | 'done' | 'error'>,
        ) {
            state.attestationSteps.issueChallenge.status = action.payload;
        },
    },
});

export const { setIssuedChallenge, setAttestationQuote, updateStep } =
    attestationSlice.actions;
export default attestationSlice.reducer;
