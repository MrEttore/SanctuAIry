import {
    // AttestationEvidence,
    // AttestationHeader,
    AttestationSummary,
    AttestationTimeline,
    ImageVerification,
} from '../features/Attestation';

export function Attestation() {
    return (
        <main className="flex flex-1 flex-col space-y-3 bg-gradient-to-r from-teal-950 from-2% to-slate-800 to-95%">
            {/* <AttestationHeader /> */}
            <AttestationSummary />
            {/* TODO: Move Evidence in modal window? */}
            {/* <AttestationEvidence /> */}
            <AttestationTimeline />
            <ImageVerification />
        </main>
    );
}
