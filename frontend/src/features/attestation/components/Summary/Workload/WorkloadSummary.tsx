import { useQuery } from '@tanstack/react-query';
import { CircleX, LoaderCircle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryClient } from '../../../../../lib/queryClient';
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
        isFetching,
        isError,
        isSuccess,
        data: workloadData,
        error,
    } = useQuery({
        queryKey: ['workloads'],
        queryFn: getWorkloadSummary,
        retry: 2,
        staleTime: 3 * 1000,
    });

    useEffect(() => {
        if (isSuccess && workloadData) dispatch(setWorkload(workloadData));
    }, [isSuccess, workloadData, dispatch]);

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
                <div className="space-y-3 p-2 rounded-2xl flex flex-col flex-1 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="xl:text-xl lg:text-lg font-medium">
                                Running workloads:
                                <span className="ml-2 rounded-lg px-1.5 bg-teal-800/20 shadow-xs font-medium">
                                    {workload.containers.length > 0
                                        ? workload.containers.length
                                        : '---'}
                                </span>
                            </h3>
                            <button
                                className="flex items-center gap-1.5 rounded-lg p-1 text-base font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                onClick={() =>
                                    queryClient.invalidateQueries({
                                        queryKey: ['workloads'],
                                    })
                                }
                            >
                                <RefreshCw
                                    size={15}
                                    className={`${isFetching ? 'animate-spin' : ''}`}
                                />
                            </button>
                        </div>
                        {isSuccess && (
                            <button
                                className="flex items-center gap-1 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                onClick={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_ALL_WORKLOAD_METADATA,
                                    )
                                }
                            >
                                View All Workload Metadata
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
                                {error.message}
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
                    workload && (
                        <AllWorkloadMetadataOverview workload={workload} />
                    )}
                {modalType === ModalType.VIEW_CONTAINER && workload && (
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
