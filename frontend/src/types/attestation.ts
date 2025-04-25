export type AttestationState = {
    issuedChallenge: string | null;
    attestationQuote: object | null;
    attestationSteps: {
        issueChallenge: {
            status: 'idle' | 'pending' | 'done' | 'error';
        };
        generateEvidence: {
            status: 'idle' | 'pending' | 'done' | 'error';
        };
        verifyTee: {
            status: 'idle' | 'pending' | 'done' | 'error';
        };
        validateImage: {
            status: 'idle' | 'pending' | 'done' | 'error';
        };
        signResult: {
            status: 'idle' | 'pending' | 'done' | 'error';
        };
    };
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
