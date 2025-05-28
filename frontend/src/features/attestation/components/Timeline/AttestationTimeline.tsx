import { Handshake } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { getAttestationSteps } from '../../attestationSlice';
import { GeneratedChallenge, TeeEvidence } from '../Evidence';
import { AttestationStep } from './AttestationStep';
import { IssueChallengeForm } from './IssueChallengeForm';

/**
 * Visualizes the attestation flow for the Relying Party.
 * Exposes the attestation steps and their statuses to the user, fulfilling transparency requirements T1 and T2.
 * Ensures evidence integrity across intermediaries, fulfilling trust minimization requirement TM3.
 */
export function AttestationTimeline() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType | null>(null);

    const {
        issueChallenge,
        generateEvidence,
        verifyTee,
        validateImage,
        signResult,
    } = useSelector(getAttestationSteps);
    const { issuedChallenge, attestationQuote } = useSelector(
        (state: RootState) => state.attestation,
    );

    function handleSelectModal(modalType: ModalType) {
        setModalType(modalType);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="mx-3">
                <div className="flex flex-col space-y-6 rounded-2xl bg-teal-50 p-4 py-2 shadow-md text-teal-950">
                    {/* HEADER */}
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold">
                                How we ensure confidentiality
                            </h2>
                            <button
                                className="flex items-center justify-center gap-1.5 rounded-full h-5 w-5 px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                onClick={() =>
                                    handleSelectModal(
                                        ModalType.HOW_IT_WORKS_ATTESTATION,
                                    )
                                }
                            >
                                ?
                            </button>
                        </div>
                        <div>
                            {/* TODO: Attestation not available when no communication with backend. */}
                            <button
                                className="flex items-center gap-1.5 rounded-lg px-1.5 text-base py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                                onClick={() =>
                                    handleSelectModal(
                                        ModalType.START_ATTESTATION,
                                    )
                                }
                            >
                                <Handshake size={20} />
                                Start Attestation
                            </button>
                        </div>
                    </div>

                    {/* STEPS */}
                    <div>
                        <div className="flex w-full space-x-2">
                            {/* 1: Issue Challenge */}
                            <AttestationStep
                                name="Issue Challenge"
                                status={issueChallenge.status}
                                artifactName="challenge"
                                artifactValue={issuedChallenge}
                                action={() =>
                                    handleSelectModal(ModalType.VIEW_CHALLENGE)
                                }
                            />

                            {/* 2: Generate Evidence */}
                            <AttestationStep
                                name="Generate Evidence"
                                status={generateEvidence.status}
                                artifactName="evidence"
                                artifactValue={attestationQuote}
                                action={() =>
                                    handleSelectModal(ModalType.VIEW_EVIDENCE)
                                }
                            />

                            {/* 3: Verify TEE */}
                            <AttestationStep
                                name="Verify TEE"
                                status={verifyTee.status}
                                // artifactName={... ? 'evidence' : ''}
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
                                // artifactName={... ? 'evidence' : ''}
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
                                // artifactName={... ? 'evidence' : ''}
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
