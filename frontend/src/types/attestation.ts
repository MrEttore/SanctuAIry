export type AttestationState = {
    issuedChallenge: string | null;
    attestationQuote: AttestationQuote | null;
    attestationSteps: AttestationSteps;
};

export type AttestationQuote = {
    [key: string]: unknown;
};

export type AttestationSteps = {
    issueChallenge: {
        status: AttestationStepStatus;
    };
    generateEvidence: {
        status: AttestationStepStatus;
    };
    verifyTee: {
        status: AttestationStepStatus;
    };
    validateImage: {
        status: AttestationStepStatus;
    };
    signResult: {
        status: AttestationStepStatus;
    };
};

export type AttestationStepStatus = 'idle' | 'pending' | 'done' | 'error';

export type UpdateStepPayload = {
    step: keyof AttestationSteps;
    status: 'idle' | 'pending' | 'done' | 'error';
};

export enum TrustStatus {
    TRUSTED = 'trusted',
    UNTRUSTED = 'untrusted',
    UNKNOWN = 'unknown',
}

export enum ChallengeGenerationMode {
    AUTOMATIC = 'automatic',
    MANUAL = 'manual',
}
