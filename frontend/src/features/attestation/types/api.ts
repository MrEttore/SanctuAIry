import {
    Challenge,
    Infrastructure,
    Quote,
    VerificationResult,
    Workloads,
} from './attestation';

// Requests

export type VerifyTdxQuoteRequest = {
    issuedChallenge: Challenge;
    baselineManifestUrl: string;
    quote: Quote;
};

export type VerifyInfrastructureRequest = {
    issuedChallenge: Challenge;
    baselineManifestUrl: string;
    evidence: Infrastructure;
};

export type VerifyWorkloadsRequest = {
    issuedChallenge: Challenge;
    referenceImage: {
        namespace: string;
        repository: string;
        tag: string;
    };
    evidence: Workloads;
};

// ...

// Responses

export type VerifyTdxQuoteResponse = {
    status: 'success' | 'error';
    data: VerificationResult;
};
