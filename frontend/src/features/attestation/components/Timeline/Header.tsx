import { CirclePlay, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import {
    getChallenge,
    resetAttestation,
    updateStep,
} from '../../attestationSlice';
import { InfoRunVerification } from '../Modals';

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const challenge = useSelector(getChallenge);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    function handleStartAttestation() {
        if (challenge) dispatch(resetAttestation());

        dispatch(
            updateStep({
                step: 'generateChallenge',
                status: 'active',
            }),
        );
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-medium">
                            Run Verification
                        </h2>
                        <button
                            className="flex items-center justify-center gap-1.5 rounded-full h-5 w-5 px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800 hover:-translate-y-0.5"
                            onClick={() =>
                                handleSelectModal(
                                    ModalType.INFO_RUN_VERIFICATION,
                                )
                            }
                        >
                            ?
                        </button>
                    </div>
                    <p className="text-teal-950 opacity-80 font-normal">
                        This will initiate a real-time attestation process,
                        verifying SanctuAIry's confidentiality state
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex items-center gap-1.5 rounded-md px-1 py-0.5 font-semibold cursor-pointer transition-all text-xl duration-400 hover:bg-teal-950/10"
                        onClick={handleStartAttestation}
                    >
                        {!challenge ? (
                            <p className="flex items-center gap-1">
                                <CirclePlay />
                                Start Attestation
                            </p>
                        ) : (
                            <p className="flex items-center gap-1">
                                <RotateCcw size={20} />
                                Start a new Attestation
                            </p>
                        )}
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.INFO_RUN_VERIFICATION && (
                    <InfoRunVerification />
                )}
            </Modal>
        </>
    );
}
