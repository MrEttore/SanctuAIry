import { AttestationSummary } from './components/Summary';
import { AttestationTimeline } from './components/Timeline';

export function AttestationPage() {
    return (
        <main className="flex flex-1 flex-col space-y-3 bg-gradient-to-r from-teal-950 from-2% to-slate-800 to-95%">
            <AttestationSummary />
            <AttestationTimeline />

            {/* TODO: Move Evidence in modal window? */}
            {/* <AttestationEvidence /> */}
        </main>
    );
}
