import { useQuery } from '@tanstack/react-query';
import {
    CircleX,
    HardDrive,
    LoaderCircle,
    RefreshCw,
    Server,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { queryClient } from '../../../../../lib/queryClient';
import { AppDispatch } from '../../../../../redux/store';
import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import {
    getConfidentialInfrastructure,
    setConfidentialInfrastructure,
} from '../../../attestationSlice';
import { getInfrastructureSummary } from '../../../services/evidenceProviderApi';
import { DiskOverview } from './DiskOverview';
import { InstanceAttribute } from './InstanceAttribute';
import { InstanceOverview } from './InstanceOverview';

export function InfrastructureSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { summary, instance, disk } = useSelector(
        getConfidentialInfrastructure,
    );

    const {
        isPending,
        isFetching,
        isError,
        isSuccess,
        data: infrastructureData,
        error,
    } = useQuery({
        queryKey: ['confidential-Infrastructure'],
        queryFn: getInfrastructureSummary,
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        if (isSuccess && infrastructureData)
            dispatch(setConfidentialInfrastructure(infrastructureData));
    }, [isSuccess, infrastructureData, dispatch]);

    const confidentialTechnology =
        instance?.confidentialInstanceConfig?.confidentialInstanceType ??
        'Unknown';

    const cpuPlatform = instance?.cpuPlatform ?? 'Unknown';

    const summaryWithConfidentialTechnology = {
        ...summary,
        confidentialTechnology,
        cpuPlatform,
    };

    const instanceProperties = summaryWithConfidentialTechnology
        ? Object.entries(summaryWithConfidentialTechnology)
        : [];

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="flex flex-col text-teal-950 pr-1">
                <div className="space-y-3 p-2 rounded-2xl flex h-full flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="xl:text-xl lg:text-lg font-medium">
                            VM instance
                        </h3>
                        <button
                            className="flex items-center gap-1.5 rounded-lg p-1 text-base font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                            onClick={() =>
                                queryClient.invalidateQueries({
                                    queryKey: ['confidential-Infrastructure'],
                                })
                            }
                        >
                            <RefreshCw
                                size={15}
                                className={`${isFetching ? 'animate-spin' : ''}`}
                            />
                        </button>
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
                        <div className="flex flex-1 flex-col rounded-lg p-1.5 bg-teal-800/20 shadow-xs justify-between">
                            <div className="grid grid-cols-2 gap-2 2xl:text-sm lg:text-xs">
                                {instanceProperties.map(([key, value]) => (
                                    <InstanceAttribute
                                        key={key}
                                        name={key}
                                        value={value}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    className="flex items-center gap-1.5 rounded-lg px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_VM_DISK,
                                        )
                                    }
                                >
                                    <HardDrive size={15} />
                                    Inspect disk
                                </button>
                                <button
                                    className="flex items-center gap-1.5 rounded-lg px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_VM_IDENTITY,
                                        )
                                    }
                                >
                                    <Server size={15} />
                                    Inspect VM
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.VIEW_VM_IDENTITY && instance && (
                    <InstanceOverview
                        instanceData={instance}
                        instanceName={instance?.name}
                    />
                )}
                {modalType === ModalType.VIEW_VM_DISK && disk && (
                    <DiskOverview diskData={disk} diskName={disk?.name} />
                )}
            </Modal>
        </>
    );
}
