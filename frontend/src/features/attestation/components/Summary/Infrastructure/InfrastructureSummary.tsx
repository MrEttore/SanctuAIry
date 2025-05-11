import { useQuery } from '@tanstack/react-query';
import { ExternalLink, LoaderCircle } from 'lucide-react';
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
    });

    useEffect(() => {
        if (isSuccess && payload)
            dispatch(setConfidentialInfrastructure(payload.data));
    }, [isSuccess, payload, dispatch]);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="flex flex-col">
                <h2 className="text-2xl mb-6 font-semibold text-teal-900 px-2">
                    Confidential Infrastructure
                </h2>
                <div className="space-y-3 text-teal-950 p-2 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <p>Cloud Platform:</p>
                        <p
                            className={`flex items-center gap-1.5 rounded-lg px-1.5 py-1 font-medium ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs`}
                        >
                            {isPending
                                ? 'Loading'
                                : (summary?.provider ?? 'Unknown')}
                            {isPending && (
                                <LoaderCircle
                                    size={12}
                                    className="text-yellow-600 animate-spin"
                                />
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <p>Confidential Instance:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm border-b-2 pb-3 border-teal-800/30">
                            {/* TODO: Make attributes reusable*/}
                            <div className="flex justify-between items-center">
                                <p>Inst. Name</p>
                                <p
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs  font-medium`}
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (summary?.name ?? 'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Inst. Id</p>
                                <p
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs  font-medium`}
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (summary?.instanceId ?? 'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Conf. Tech.</p>
                                <button
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} cursor-pointer hover:bg-teal-800/40 transition-all duration-300 shadow-xs font-medium`}
                                    onClick={() =>
                                        handleSelectModal(
                                            ModalType.VIEW_CONFIDENTIAL_TECHNOLOGY,
                                        )
                                    }
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (instance?.confidentialInstanceConfig
                                              .confidentialInstanceType ??
                                          'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                    {instance && <ExternalLink size={15} />}
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Inst. Status</p>
                                <p
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs  font-medium`}
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (summary?.status ?? 'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Inst. Zone</p>
                                <p
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs  font-medium`}
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (summary?.zone ?? 'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Proj. Id</p>
                                <p
                                    className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 ${isError ? 'bg-orange-800/20' : 'bg-teal-800/20'} shadow-xs  font-medium`}
                                >
                                    {isPending
                                        ? 'Loading'
                                        : (summary?.projectId ?? 'Unknown')}
                                    {isPending && (
                                        <LoaderCircle
                                            size={12}
                                            className="text-yellow-600 animate-spin"
                                        />
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <div className="flex justify-center">
                            <button
                                className={`flex text-xl items-center gap-1.5 rounded-lg px-1.5 py-1 font-medium ${isError ? 'bg-orange-800/20 text-orange-900' : 'bg-teal-800/20 text-teal-950 cursor-pointer hover:bg-teal-900 transition-all duration-300 hover:shadow'} `}
                                onClick={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_VM_IDENTITY,
                                    )
                                }
                                disabled={!instance}
                            >
                                {isPending
                                    ? 'Loading instance'
                                    : isError
                                      ? "Instance can't be inspected"
                                      : 'Inspect VM'}
                                {instance && <ExternalLink size={15} />}
                                {isPending && (
                                    <LoaderCircle
                                        size={18}
                                        className="text-yellow-600 animate-spin"
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            >
                {modalType === ModalType.VIEW_CONFIDENTIAL_TECHNOLOGY && (
                    <div className="space-y-8 text-slate-800">
                        <h2
                            id="modal-title"
                            className="text-2xl font-semibold "
                        >
                            Confidential Technology
                        </h2>
                        <p className="text-lg font-light flex gap-1 bg-slate-300/30 rounded-md px-4 py-2">
                            Intel® TDX (Trust Domain Extensions) is a
                            technology that helps protect sensitive data inside
                            virtual machines. It creates a secure area - called
                            a "Trust Domain" - that keeps your data isolated,
                            even from the cloud provider's system. With TDX,
                            your information stays private and safe from
                            snooping or tampering, making it ideal for running
                            confidential workloads in the cloud.
                        </p>
                    </div>
                )}
                {modalType === ModalType.VIEW_VM_IDENTITY &&
                    instance &&
                    summary && (
                        <InstanceOverview
                            instanceData={instance}
                            instanceName={summary?.name}
                        />
                    )}
            </Modal>
        </>
    );
}
