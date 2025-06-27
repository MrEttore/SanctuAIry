import { CloudInfrastructureOverviewHeader } from './CloudInfrastructureOverviewHeader';
import { InfrastructureSummary } from './Infrastructure';
import { WorkloadsSummary } from './Workloads';

/**
 * Displays attestation results in a structured and user-friendly format.
 * Includes summaries of confidential infrastructure and workload integrity, fulfilling transparency requirement T2.
 * Exposes container image metadata, such as hashes and repository origins, fulfilling code integrity requirement CI2.
 */
export function CloudInfrastructureOverview() {
    return (
        <div className="mx-2">
            <div className="rounded-lg p-2 shadow-md bg-white min-h-0 overflow-hidden">
                <CloudInfrastructureOverviewHeader />
                <div className="grid grid-cols-[1fr_1fr] divide-x-1 divide-teal-800/10 max-h-[30vh]">
                    <InfrastructureSummary />
                    <WorkloadsSummary />
                </div>
            </div>
        </div>
    );
}
