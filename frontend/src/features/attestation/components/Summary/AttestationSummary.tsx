import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { InfoCloudInfrastructureOverview } from './InfoCloudInfrastructureOverview';
import { InfrastructureSummary } from './Infrastructure/InfrastructureSummary';
import { WorkloadSummary } from './Workload/WorkloadSummary';

/**
 * Displays attestation results in a structured and user-friendly format.
 * Includes summaries of confidential infrastructure and workload integrity, fulfilling transparency requirement T2.
 * Exposes container image metadata, such as hashes and repository origins, fulfilling code integrity requirement CI2.
 */
export function AttestationSummary() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        // h-[35vh]
        <>
            <div className="mx-3 mt-3">
                <div className="rounded-2xl p-2 shadow-md bg-teal-50 min-h-0 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold pl-2 text-teal-950">
                            SanctuAIry's Cloud Infrastructure Overview
                        </h2>
                        <button
                            className="flex items-center justify-center gap-1.5 rounded-full h-5 w-5 px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                            onClick={() =>
                                handleSelectModal(
                                    ModalType.INFO_CLOUD_INFRASTRUCTURE_OVERVIEW,
                                )
                            }
                        >
                            ?
                        </button>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] divide-x-1 divide-teal-800/10 h-[30vh]">
                        <InfrastructureSummary />
                        <WorkloadSummary />
                    </div>

                    {/* SUMMARY ACTIONS */}
                    {/* <div className="flex justify-end">
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700 hover:shadow"
                        onClick={() => {
                            // TODO: Add attestation refresh logic.
                        }}
                    >
                        <RefreshCw />
                        REFRESH
                    </button>
                </div> */}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_CLOUD_INFRASTRUCTURE_OVERVIEW && (
                    <InfoCloudInfrastructureOverview />
                )}
            </Modal>
        </>
    );
}
