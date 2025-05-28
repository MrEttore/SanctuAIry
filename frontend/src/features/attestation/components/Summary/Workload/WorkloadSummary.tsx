import { useQuery } from '@tanstack/react-query';
import { CircleX, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../redux/store';
import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getWorkload, setWorkload } from '../../../attestationSlice';
import { getWorkloadSummary } from '../../../services/evidenceProviderApi';
import { AllWorkloadMetadataOverview } from './AllWorkloadMetadataOverview';
import { ContainerOverview } from './ContainerOverview';
import { WorkloadContainer } from './WorkloadContainer';

export function WorkloadSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [selectedContainer, setSelectedContainer] = useState<string | null>(
        null,
    );

    const dispatch: AppDispatch = useDispatch();
    const workload = useSelector(getWorkload);

    const {
        isPending,
        isError,
        isSuccess,
        data: payload,
    } = useQuery({
        queryKey: ['workloads'],
        queryFn: getWorkloadSummary,
        retry: 2,
        staleTime: 3 * 1000,
    });

    useEffect(() => {
        if (isSuccess && payload) dispatch(setWorkload(payload.data));
    }, [isSuccess, payload, dispatch]);

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
                <h2 className="lg:text-xl xl:text-2xl mb-6 font-semibold px-2 uppercase">
                    Workloads
                </h2>
                <div className="space-y-3 p-2 rounded-2xl flex flex-col flex-1 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between">
                        <h3 className="xl:text-xl lg:text-lg font-medium">
                            Running workloads:
                            <span className="ml-2 rounded-lg px-1.5 bg-teal-800/20 shadow-xs font-medium">
                                {workload.containers.length > 0
                                    ? workload.containers.length
                                    : '---'}
                            </span>
                        </h3>
                        {workload && isSuccess && (
                            <button
                                className="flex items-center gap-1 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                onClick={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_ALL_WORKLOAD_METADATA,
                                    )
                                }
                            >
                                View Workload Metadata
                            </button>
                        )}
                    </div>

                    {isPending && (
                        <div className="flex flex-1 items-center justify-center">
                            <p className="font-medium text-xl flex items-center justify-center px-4 py-2 shadow-xs rounded-xl bg-yellow-800/20 text-yellow-900">
                                Loading
                                <LoaderCircle
                                    size={20}
                                    className="text-yellow-700 animate-spin ml-1"
                                />
                            </p>
                        </div>
                    )}

                    {isError && (
                        <div className="flex flex-1 items-center justify-center">
                            <p className="font-medium text-xl flex items-center justify-center rounded-xl bg-orange-800/20 px-4 py-2 text-orange-900 shadow-xs">
                                <CircleX size={20} className="mr-1" />
                                No workloads found
                            </p>
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex flex-col text flex-1 overflow-hidden">
                            <div className="overflow-y-auto flex-1 min-h-0 pb-2 space-y-1">
                                {workload.containers.length > 0
                                    ? workload.containers.map((container) => (
                                          <WorkloadContainer
                                              key={container.id}
                                              container={container}
                                              onInspect={handleSelectModal}
                                          />
                                      ))
                                    : '---'}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {modalType === ModalType.VIEW_ALL_WORKLOAD_METADATA &&
                    payload && (
                        <AllWorkloadMetadataOverview workload={workload} />
                    )}
                {modalType === ModalType.VIEW_CONTAINER && payload && (
                    <ContainerOverview
                        container={workload.containers.find(
                            (container) => container.id === selectedContainer,
                        )}
                    />
                )}
            </Modal>
        </>
    );
}
