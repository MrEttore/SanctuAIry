// import { RefreshCw } from 'lucide-react';
import { InfrastructureSummary } from './Infrastructure/InfrastructureSummary';
import { TrustStatus } from './TrustStatus/TrustStatus';
import { WorkloadSummary } from './Workload/WorkloadSummary';

export function AttestationSummary() {
    return (
        <div className="mx-3 mt-3">
            <div className="space-y-6 rounded-2xl p-2 shadow-md bg-teal-50">
                {/* TODO: Add title to section? */}
                <div className="grid grid-cols-[1fr_1fr_0.5fr] space-x-2">
                    <InfrastructureSummary />
                    <WorkloadSummary />
                    <TrustStatus />
                </div>

                {/* SUMMARY ACTIONS */}
                {/* <div className="flex justify-end">
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700 hover:shadow"
                        onClick={() => {
                            // TODO: Add attestation refresh logic.
                        }}
                    >
                        <RefreshCw />
                        REFRESH
                    </button>
                </div> */}
            </div>
        </div>
    );
}
