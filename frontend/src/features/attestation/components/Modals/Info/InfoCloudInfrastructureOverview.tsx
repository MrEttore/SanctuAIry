import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoCloudInfrastructureOverview() {
    return (
        <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
            <ModalHeader
                title=" About the Cloud Infrastructure Overview"
                icon={<Info />}
            />
            <p>
                This section provides a complete overview of the cloud
                infrastructure and workloads used to run the SanctuAIry service.
                It includes details about the virtual machine configuration,
                disk provenance, and trusted execution features, as well as a
                list of containerized workloads running inside the confidential
                environment, giving you full visibility into the system's
                integrity and operational state.
            </p>
        </div>
    );
}
