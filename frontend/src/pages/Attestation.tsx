import {
    AttestationEvidence,
    AttestationHeader,
    AttestationSummary,
    ImageVerification,
    VerificationLog,
} from '../features/Attestation';

export function Attestation() {
    return (
        <main className="flex w-full flex-col space-y-3 bg-teal-50">
            <AttestationHeader />
            <AttestationSummary />
            <AttestationEvidence />
            <VerificationLog />
            <ImageVerification />
        </main>
    );
}
