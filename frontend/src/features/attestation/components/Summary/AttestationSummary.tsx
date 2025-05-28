// import { RefreshCw } from 'lucide-react';
import { InfrastructureSummary } from './Infrastructure/InfrastructureSummary';
// import { TrustStatus } from './TrustStatus/TrustStatus';
import { WorkloadSummary } from './Workload/WorkloadSummary';

/**
 * Displays attestation results in a structured and user-friendly format.
 * Includes summaries of confidential infrastructure and workload integrity, fulfilling transparency requirement T2.
 * Exposes container image metadata, such as hashes and repository origins, fulfilling code integrity requirement CI2.
 */
export function AttestationSummary() {
    return (
        <div className="mx-3 mt-3 h-[35vh]">
            <div className="space-y-6 rounded-2xl p-2 shadow-md bg-teal-50 h-full min-h-0 overflow-hidden">
                {/* TODO: Add title to section? */}
                <div className="grid grid-cols-[1fr_1fr] divide-x-1 divide-teal-800/10 h-full">
                    <InfrastructureSummary />
                    <WorkloadSummary />
                    {/* <TrustStatus /> */}
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
