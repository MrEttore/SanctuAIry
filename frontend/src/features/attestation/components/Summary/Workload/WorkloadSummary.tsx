import { useQuery } from '@tanstack/react-query';
import { CircleX, ExternalLink, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../redux/store';
import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import { getWorkload, setWorkload } from '../../../attestationSlice';
import { getWorkloadSummary } from '../../../services/attestationApi';
import { WorkloadContainer } from './WorkloadContainer';
import { WorkloadImage } from './WorkloadImage';

export function WorkloadSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType /*, setModalType*/] = useState<ModalType | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { containers, images } = useSelector(getWorkload);

    const {
        isPending,
        isError,
        isSuccess,
        data: payload,
    } = useQuery({
        queryKey: ['workloads'],
        queryFn: getWorkloadSummary,
        retry: 2,
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        if (isSuccess && payload) dispatch(setWorkload(payload.data));
    }, [isSuccess, payload, dispatch]);

    // function handleSelectModal(modalType: ModalType) {
    //     setModalType(modalType);
    //     setIsModalOpen(true);
    // }

    return (
        <>
            <div className="flex flex-col text-teal-950 pl-1">
                <h2 className="text-2xl mb-6 font-semibold px-2 uppercase">
                    Workloads
                </h2>
                <div className="space-y-3 p-2 rounded-2xl flex h-full flex-col">
                    <h3 className="text-xl font-medium">
                        Workloads running:
                        <span className="ml-2 rounded-lg px-1.5 bg-teal-800/20 shadow-xs font-medium">
                            {containers.length > 0 ? containers.length : '---'}
                        </span>
                    </h3>

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
                        <>
                            <div className="flex flex-col text pb-3 divide-y-1 divide-teal-800/10 flex-1">
                                <div className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium mb-2">
                                            Containers
                                        </p>
                                        <button
                                            className="flex items-center gap-1.5 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                            onClick={() =>
                                                // handleSelectModal(
                                                //     ModalType.VIEW_VM_IDENTITY,
                                                // )
                                                {}
                                            }
                                        >
                                            Inspect
                                            <ExternalLink size={15} />
                                        </button>
                                    </div>
                                    {containers.length > 0 ? (
                                        <div>
                                            {containers.map((container) => (
                                                <WorkloadContainer
                                                    container={container}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        '---'
                                    )}
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium mb-2">
                                            Images
                                        </p>
                                        <button
                                            className="flex items-center gap-1.5 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                            onClick={() =>
                                                // handleSelectModal(
                                                //     ModalType.VIEW_VM_IDENTITY,
                                                // )
                                                {}
                                            }
                                        >
                                            Inspect
                                            <ExternalLink size={15} />
                                        </button>
                                    </div>
                                    {images.length > 0 ? (
                                        <div>
                                            {images.map((image) => (
                                                <WorkloadImage image={image} />
                                            ))}
                                        </div>
                                    ) : (
                                        '---'
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-around"></div>
                        </>
                    )}
                </div>
            </div>

            {/* TODO: Add inspect modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                {modalType === ModalType.VIEW_VM_IDENTITY && payload && (
                    // <InstanceOverview
                    //     instanceData={instance}
                    //     instanceName={summary?.name}
                    // />
                    <p></p>
                )}
            </Modal>
        </>
    );
}
