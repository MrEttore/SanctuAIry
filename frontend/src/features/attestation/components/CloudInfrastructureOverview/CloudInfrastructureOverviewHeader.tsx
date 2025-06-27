import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { InfoCloudInfrastructureOverview } from '../Modals';

export function CloudInfrastructureOverviewHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="space-y-2">
                <h2 className="text-2xl font-medium">
                    Cloud Infrastructure Overview
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-teal-950 opacity-80 font-normal">...</p>
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
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_CLOUD_INFRASTRUCTURE_OVERVIEW && (
                    <InfoCloudInfrastructureOverview />
                )}
            </Modal>
        </>
    );
}
