import { HardDrive, Info, Server } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getEvidence, getVerification } from '../../../attestationSlice';
import { ArtifactType, TrustStatus } from '../../../types/attestation';
import { computeTrustStatus } from '../../../utils/computeVerification';
import { ViewInstanceDisk, ViewInstanceIdentity } from '../../Modals';
import { TrustStatusBadge } from '../../TrustStatusBadge';
import { InstanceAttribute } from './InstanceAttribute';

export function InfrastructureSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const infrastructure = useSelector(getEvidence)?.infrastructure;
    const verification = useSelector(getVerification);

    const confidentialTechnology =
        infrastructure?.instance?.confidentialInstanceConfig
            ?.confidentialInstanceType ?? 'Unknown';
    const cpuPlatform = infrastructure?.instance?.cpuPlatform ?? 'Unknown';
    const summaryWithConfidentialTechnology = {
        ...infrastructure?.summary,
        confidentialTechnology,
        cpuPlatform,
    };
    const instanceProperties = summaryWithConfidentialTechnology
        ? Object.entries(summaryWithConfidentialTechnology)
        : [];

    const trustStatus = computeTrustStatus(
        ArtifactType.INFRASTRUCTURE_EVIDENCE,
        verification,
    );

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="flex flex-col text-teal-950 pr-1">
                <div className="space-y-3 p-2 rounded-2xl flex h-full flex-col divide-y-1 divide-teal-800/10">
                    <div className="flex items-center justify-between">
                        <h3 className="xl:text-xl lg:text-lg font-medium pb-2">
                            VM instance
                        </h3>
                        <TrustStatusBadge
                            forArtifact={ArtifactType.INFRASTRUCTURE_EVIDENCE}
                            size="md"
                            emphasized={verification ? true : false}
                        />
                    </div>

                    {infrastructure ? (
                        <div
                            className={`flex flex-1 flex-col rounded-lg p-1.5 shadow-xs justify-between ${trustStatus === TrustStatus.TRUSTED ? 'bg-teal-900/20' : trustStatus === TrustStatus.UNTRUSTED ? 'bg-red-500/20' : 'bg-amber-900/20'}`}
                        >
                            <div className="grid grid-cols-2 gap-2 2xl:text-sm lg:text-xs">
                                {instanceProperties.map(([key, value]) => (
                                    <InstanceAttribute
                                        key={key}
                                        name={key}
                                        value={value}
                                    />
                                ))}
                            </div>
                            <hr className="border-1 border-teal-800/10 h-full rounded-full" />
                            <div className="flex justify-end gap-2 mt-0.5">
                                <button
                                    className="flex items-center gap-1.5 rounded-sm px-1.5 text-base py-1 font-medium cursor-pointer text-teal-950 transition-all duration-400 hover:bg-teal-900/10"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_INSTANCE_DISK,
                                        )
                                    }
                                >
                                    <HardDrive size={15} />
                                    Inspect disk
                                </button>
                                <button
                                    className="flex items-center gap-1.5 rounded-sm px-1.5 text-base py-1 font-medium cursor-pointer text-teal-950 transition-all duration-400 hover:bg-teal-900/10"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_INSTANCE_IDENTITY,
                                        )
                                    }
                                >
                                    <Server size={15} />
                                    Inspect VM
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="px-3 py-2 rounded-lg flex flex-1 items-center justify-center">
                            <p className="flex items-center gap-1 px-1 font-semibold rounded-md w-fit p-0.5 bg-teal-950/10 text-teal-950 opacity-75">
                                <Info size={15} />
                                Gather infrastructure evidence to view VM
                                information
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.VIEW_INSTANCE_IDENTITY &&
                    infrastructure && (
                        <ViewInstanceIdentity
                            instanceData={infrastructure.instance}
                            instanceName={infrastructure.instance?.name}
                            artifactType={ArtifactType.INSTANCE_IDENTITY}
                        />
                    )}
                {modalType === ModalType.VIEW_INSTANCE_DISK &&
                    infrastructure && (
                        <ViewInstanceDisk
                            diskData={infrastructure.disk}
                            diskName={infrastructure.disk?.name}
                            artifactType={ArtifactType.INSTANCE_DISK}
                        />
                    )}
            </Modal>
        </>
    );
}
