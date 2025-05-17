import { useQuery } from '@tanstack/react-query';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../redux/store';
import { ModalType } from '../../../../../types/ui';
import { Modal } from '../../../../../ui';
import {
    getConfidentialInfrastructure,
    setConfidentialInfrastructure,
} from '../../../attestationSlice';
import { getInfrastructureSummary } from '../../../services/attestationApi';
import { InstanceAttribute } from './InstanceAttribute';
import { InstanceOverview } from './InstanceOverview';

export function InfrastructureSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const { summary, instance } = useSelector(getConfidentialInfrastructure);

    const {
        isPending,
        isError,
        isSuccess,
        data: payload,
    } = useQuery({
        queryKey: ['confidential-Infrastructure'],
        queryFn: getInfrastructureSummary,
        retry: 2,
        staleTime: 5 * 1000,
    });

    useEffect(() => {
        if (isSuccess && payload)
            dispatch(setConfidentialInfrastructure(payload.data));
    }, [isSuccess, payload, dispatch]);

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
                <h2 className="text-2xl mb-6 font-semibold px-2 uppercase">
                    Confidential Infrastructure
                </h2>
                <div className="space-y-3 p-2 rounded-2xl flex h-full flex-col">
                    <h3 className="text-xl font-medium">VM Instance</h3>

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
                                No instance found
                            </p>
                        </div>
                    )}

                    {isSuccess && (
                        <>
                            <div className="grid grid-cols-2 gap-2 text-sm flex-1">
                                {instanceProperties.map(([key, value]) => (
                                    <InstanceAttribute
                                        key={key}
                                        name={key}
                                        value={value}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="flex items-center gap-1.5 rounded-lg px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_VM_IDENTITY,
                                        )
                                    }
                                >
                                    Inspect VM
                                    <ExternalLink size={15} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                {modalType === ModalType.VIEW_VM_IDENTITY && payload && (
                    <InstanceOverview
                        instanceData={instance}
                        instanceName={summary?.name}
                    />
                )}
            </Modal>
        </>
    );
}
