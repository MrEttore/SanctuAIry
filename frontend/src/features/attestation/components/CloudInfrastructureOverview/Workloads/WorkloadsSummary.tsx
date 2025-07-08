import { Info } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getEvidence } from '../../../attestationSlice';
import { ArtifactType } from '../../../types/attestation';
import { ViewContainer } from '../../Modals';
import { WorkloadContainer } from './WorkloadContainer';

export function WorkloadsSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [selectedContainer, setSelectedContainer] = useState<string | null>(
        null,
    );

    const workloads = useSelector(getEvidence)?.workloads;

    function handleSelectModal(modalType: ModalType, containerId?: string) {
        setModalType(modalType);
        if (modalType === ModalType.VIEW_CONTAINER && containerId)
            setSelectedContainer(containerId);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedContainer(null);
    }

    return (
        <>
            <div className="flex flex-col text-teal-950 pl-1 h-full overflow-hidden min-h-0">
                <div className="space-y-3 p-2 rounded-2xl flex flex-col flex-1 overflow-hidden min-h-0 divide-y-1 divide-teal-800/10">
                    <div className="flex items-center justify-between">
                        <h3 className="xl:text-xl lg:text-lg font-medium pb-2">
                            Running workloads:
                            <span className="ml-2 rounded-lg px-1.5 bg-teal-800/20 shadow-xs font-medium">
                                {workloads?.containers.length ?? '-'}
                            </span>
                        </h3>
                    </div>
                    {workloads ? (
                        <div className="flex flex-col text flex-1 overflow-hidden">
                            <div className="overflow-y-auto flex-1 min-h-0 pb-2 space-y-1">
                                {workloads.containers.length > 0
                                    ? workloads.containers.map((container) => (
                                          <WorkloadContainer
                                              key={container.id}
                                              container={container}
                                              onInspect={handleSelectModal}
                                          />
                                      ))
                                    : '---'}
                            </div>
                        </div>
                    ) : (
                        <div className="px-3 py-2 rounded-lg flex flex-1 items-center justify-center">
                            <p className="flex items-center gap-1 px-1 font-semibold rounded-md w-fit p-0.5 bg-teal-950/10 text-teal-950 opacity-75">
                                <Info size={15} />
                                Gather workload evidence to view the running
                                containers
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalType === ModalType.VIEW_CONTAINER && workloads && (
                    <ViewContainer
                        container={workloads.containers.find(
                            (container) => container.id === selectedContainer,
                        )}
                        artifactType={ArtifactType.CONTAINER}
                    />
                )}
            </Modal>
        </>
    );
}
