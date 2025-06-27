import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoCloudInfrastructureOverview() {
    return (
        <div className="flex flex-col max-h-[70vh] text-teal-950">
            <ModalHeader
                title=" About the Cloud Infrastructure Overview"
                icon={<Info />}
            />
            <p className="p-2 bg-teal-800/20 shadow-xs rounded-lg">
                We want to ensure our customers have full transparency into the
                cloud infrastructure and workloads that process their sensitive
                data. This section highlights the services, especially those
                powering SanctuAIry's AI, designed to uphold the highest
                standards of confidentiality and integrity for your data.
            </p>
        </div>
    );
}
