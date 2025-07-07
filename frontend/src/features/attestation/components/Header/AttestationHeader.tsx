import { useState } from 'react';

import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { InfoAttestationPage } from '../Modals';

export function AttestationHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <header className="flex flex-col mb-3 text-white bg-teal-900/40 p-3 shadow-xs space-y-1">
                <h3 className="xl:text-3xl lg:text-lg font-medium">
                    Verify Service State
                </h3>
                <div className="flex items-center gap-2">
                    <p className="opacity-80 font-normal">
                        Your data confidentiality is our top priority. Verify in
                        real-time that your data is processed securely
                    </p>
                    <button
                        className="flex items-center justify-center gap-1.5 rounded-full h-5 w-5 px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 transition-all duration-400 shadow-sm hover:bg-teal-800 hover:-translate-y-0.5"
                        onClick={() =>
                            handleSelectModal(ModalType.INFO_ATTESTATION_PAGE)
                        }
                    >
                        ?
                    </button>
                </div>
            </header>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_ATTESTATION_PAGE && (
                    <InfoAttestationPage />
                )}
            </Modal>
        </>
    );
}
