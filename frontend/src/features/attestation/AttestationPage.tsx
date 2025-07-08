import { AttestationHeader } from './components/AttestationHeader';
import { CloudInfrastructureOverview } from './components/CloudInfrastructureOverview';
import IndependentVerificationResources from './components/IndependentVerificationResources/IndependentVerificationResources';
import { AttestationTimeline } from './components/Timeline';

export function AttestationPage() {
    return (
        <main className="flex flex-1 flex-col bg-gradient-to-r from-teal-950 from-2% to-slate-800 to-95%">
            <AttestationHeader />
            <div className="flex-1 overflow-y-auto mb-3">
                <div className="space-y-3">
                    <AttestationTimeline />
                    <CloudInfrastructureOverview />
                    <IndependentVerificationResources />
                </div>
            </div>
        </main>
    );
}
