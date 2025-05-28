export type AttestationState = {
    issuedChallenge: Challenge;
    attestationQuote: AttestationQuote | null;
    attestationSteps: AttestationSteps;
    confidentialInfrastructure: ConfidentialInfrastructure;
    workload: Workload;
};

export type ConfidentialInfrastructure = {
    summary: ConfidentialInfrastructureSummary | null;
    instance: ConfidentialInstance | null;
    disk: Disk | null;
};

export type ConfidentialInfrastructureSummary = {
    provider: string;
    instanceId: string;
    name: string;
    zone: string;
    machineType: string;
    status: string;
    projectId?: string;
    Subscription?: string;
};

/*
 * Complete Instance interface at:
 * https://cloud.google.com/compute/docs/reference/rest/v1/instances
 */
export type ConfidentialInstance = {
    [key: string]: unknown;
    name: string;
    confidentialInstanceConfig: {
        enableConfidentialCompute?: boolean;
        confidentialInstanceType?: string;
    };
    cpuPlatform: string;
};

/*
 * Complete Disk interface at:
 * https://cloud.google.com/compute/docs/reference/rest/v1/disks
 */
export type Disk = {
    [key: string]: unknown;
    name: string;
};

export type Workload = {
    containers: Container[];
    images: Image[];
};

export type Container = {
    id: string;
    name: string;
    image: string;
    imageDigest: string;
    state: string;
    startedAt: string;
    labels?: { [key: string]: string };
};

export type Image = {
    id: string;
    repoTags: string[];
    repoDigests: string[];
    created: string;
    size: number;
    labels?: { [key: string]: string };
};

export type Challenge = string | null;

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
