import { CircleHelp, Handshake } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { getAttestationSteps } from '../../attestationSlice';
import { GeneratedChallenge, TeeEvidence } from '../Evidence';
import { IssueChallengeForm } from '../Forms/IssueChallengeForm';
import { AttestationStep } from './AttestationStep';

/**
 * Implements the Transparency Requirements (T1-T3) of the framework.
 */
export function AttestationTimeline() {
    const { issuedChallenge, attestationQuote } = useSelector(
        (state: RootState) => state.attestation,
    );
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const {
        issueChallenge,
        generateEvidence,
        verifyTee,
        validateImage,
        signResult,
    } = useSelector(getAttestationSteps);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="mx-3">
                <div className="flex flex-col space-y-6 rounded-2xl bg-slate-100 p-4 py-2 shadow-md">
                    {/* START ATTESTATION */}
                    <div className="flex items-end justify-between">
                        <button
                            className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                            onClick={() =>
                                handleSelectModal(ModalType.START_ATTESTATION)
                            }
                        >
                            <Handshake size={20} />
                            START ATTESTATION
                        </button>

                        <button
                            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-3 py-1 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                            onClick={() =>
                                handleSelectModal(
                                    ModalType.HOW_IT_WORKS_ATTESTATION,
                                )
                            }
                        >
                            <CircleHelp size={18} />
                            How it works
                        </button>

                        {/* TODO: Attestation not available when no communication with backend. */}
                    </div>

                    {/* STEPS */}
                    <div>
                        <div className="flex w-full space-x-2">
                            {/* 1: Issue Challenge */}
                            <AttestationStep
                                name="Issue Challenge"
                                status={issueChallenge.status}
                                artifact={issuedChallenge ? 'challenge' : ''}
                                action={() =>
                                    handleSelectModal(ModalType.VIEW_CHALLENGE)
                                }
                            />

                            {/* 2: Generate Evidence */}
                            <AttestationStep
                                name="Generate Evidence"
                                status={generateEvidence.status}
                                artifact={attestationQuote ? 'evidence' : ''}
                                action={() =>
                                    handleSelectModal(ModalType.VIEW_EVIDENCE)
                                }
                            />

                            {/* 3: Verify TEE */}
                            <AttestationStep
                                name="Verify TEE"
                                status={verifyTee.status}
                                // artifact={... ? 'evidence' : ''}
                                action={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_VERIFICATION_RESULT,
                                    )
                                }
                            />

                            {/* 4: Validate Image */}
                            <AttestationStep
                                name="Validate Image"
                                status={validateImage.status}
                                // artifact={... ? 'evidence' : ''}
                                action={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_IMAGE_SOURCE,
                                    )
                                }
                            />

                            {/* 5: Sign Result */}
                            <AttestationStep
                                name="Sign Result"
                                status={signResult.status}
                                // artifact={... ? 'evidence' : ''}
                                action={() =>
                                    handleSelectModal(
                                        ModalType.VIEW_SIGNED_RESULT,
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalType === ModalType.START_ATTESTATION && (
                    <IssueChallengeForm onClose={() => setIsModalOpen(false)} />
                )}
                {modalType === ModalType.VIEW_CHALLENGE && (
                    <GeneratedChallenge issuedChallenge={issuedChallenge} />
                )}
                {modalType === ModalType.VIEW_EVIDENCE && <TeeEvidence />}
                {modalType === ModalType.VIEW_VERIFICATION_RESULT && (
                    <p>Verification result</p>
                )}
                {modalType === ModalType.VIEW_IMAGE_SOURCE && (
                    <p>Image source</p>
                )}
                {modalType === ModalType.VIEW_SIGNED_RESULT && (
                    <p>Signed result</p>
                )}
                {modalType === ModalType.HOW_IT_WORKS_ATTESTATION && (
                    <p>How it works</p>
                )}
            </Modal>
        </>
    );
}
