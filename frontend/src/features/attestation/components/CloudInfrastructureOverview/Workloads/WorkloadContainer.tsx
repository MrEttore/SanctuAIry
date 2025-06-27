import { Container as ContainerIcon, ScanSearch } from 'lucide-react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { getVerification } from '../../../attestationSlice';
import {
    ArtifactType,
    Container,
    TrustStatus,
} from '../../../types/attestation';
import { computeTrustStatus } from '../../../utils/computeVerification';
import { TrustStatusBadge } from '../../TrustStatus';

type Props = {
    container: Container;
    onInspect: (modalType: ModalType, containerId?: string) => void;
};

export function WorkloadContainer({ container, onInspect }: Props) {
    const verification = useSelector(getVerification);
    const trustStatus = computeTrustStatus(
        ArtifactType.WORKLOAD_EVIDENCE,
        verification,
    );

    return (
        <div
            className={`rounded-lg px-1.5 py-2 shadow-xs flex flex-1 justify-between ${trustStatus === TrustStatus.TRUSTED ? 'bg-teal-900/20' : trustStatus === TrustStatus.UNTRUSTED ? 'bg-red-500/20' : 'bg-amber-900/20'}`}
        >
            <div className="flex items-center">
                <ContainerIcon className="mr-3" />
                <div className="flex flex-col">
                    <p className="text-base">
                        Name:
                        <span className="ml-1 font-semibold">
                            {container.name}
                        </span>
                    </p>
                    <p className="text-sm">
                        Image:
                        <span className="ml-1 font-semibold">
                            {container.image}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <TrustStatusBadge
                    forArtifact={ArtifactType.WORKLOAD_EVIDENCE}
                    emphasized
                />
                <button
                    className="flex items-center gap-1 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                    onClick={() =>
                        onInspect(ModalType.VIEW_CONTAINER, container.id)
                    }
                >
                    <ScanSearch size={14} />
                    Inspect
                </button>
            </div>
        </div>
    );
}
