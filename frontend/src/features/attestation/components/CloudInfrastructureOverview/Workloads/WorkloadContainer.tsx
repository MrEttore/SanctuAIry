import { Container as ContainerIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { getVerification } from '../../../attestationSlice';
import {
    ArtifactType,
    Container,
    TrustStatus,
} from '../../../types/attestation';
import { computeTrustStatus } from '../../../utils/computeVerification';
import { TrustStatusBadge } from '../../TrustStatusBadge';

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
            <div className="flex items-center justify-between">
                <TrustStatusBadge
                    forArtifact={ArtifactType.WORKLOAD_EVIDENCE}
                    emphasized
                />
                <hr className="border-1 border-teal-800/10 h-full rounded-full" />
                <button
                    className="flex items-center gap-1 h-full rounded-sm px-1.5 ml-0.5 text-sm py-1 font-medium cursor-pointer text-teal-950 transition-all duration-400 hover:bg-teal-900/10"
                    onClick={() =>
                        onInspect(ModalType.VIEW_CONTAINER, container.id)
                    }
                >
                    Inspect
                </button>
            </div>
        </div>
    );
}
