import {
    Circle,
    CircleCheck,
    // CircleX,
    CircleHelp,
    Handshake,
} from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../redux/store';
import { ModalType } from '../../../../types/ui';
import { Modal } from '../../../../ui';
import { IssueChallengeForm } from '../Forms/IssueChallengeForm';
import { AttestationStep } from './AttestationStep';

/**
 * This component implements the Transparency Requirements (T1-T3) of the framework.
 *
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
    } = useSelector((state: RootState) => state.attestation.attestationSteps);

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

                    {/* TIMELINE */}
                    <div>
                        <div className="flex w-full space-x-2">
                            {/* TODO: Add reusable step component. */}

                            {/* STEP 1: Issue Challenge */}
                            <AttestationStep
                                name="Issue Challenge"
                                status={issueChallenge.status}
                                artifact={issuedChallenge ? true : false}
                                action={handleSelectModal}
                                actionType={ModalType.VIEW_CHALLENGE}
                            />

                            {/* STEP 2: Generate Evidence */}
                            <AttestationStep
                                name="Generate Evidence"
                                status={generateEvidence.status}
                                artifact={attestationQuote ? true : false}
                                action={handleSelectModal}
                                actionType={ModalType.VIEW_EVIDENCE}
                            />

                            {/* STEP 3: Verify TEE */}
                            <div className="flex-1 space-y-3 rounded-xl bg-slate-200/80 px-3 py-2">
                                <div className="flex items-center gap-2 text-xl font-medium text-teal-950">
                                    {verifyTee.status === 'idle' && (
                                        <Circle className="text-slate-700" />
                                    )}
                                    {/* Add pending, error? */}
                                    {verifyTee.status === 'done' && (
                                        <CircleCheck className="text-green-700" />
                                    )}
                                    <p>Verify TEE</p>
                                </div>
                                {true && (
                                    <button
                                        className="mx-auto flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                                        type="button"
                                        onClick={() =>
                                            handleSelectModal(
                                                ModalType.VIEW_VERIFICATION_RESULT,
                                            )
                                        }
                                    >
                                        VIEW VERIFICATION RESULT
                                    </button>
                                )}
                            </div>

                            {/* STEP 4: Validate Image */}
                            <div className="flex-1 space-y-3 rounded-xl bg-slate-200/80 px-3 py-2">
                                <div className="flex items-center gap-2 text-xl font-medium text-teal-950">
                                    {validateImage.status === 'idle' && (
                                        <Circle className="text-slate-700" />
                                    )}
                                    {/* Add pending, error? */}
                                    {validateImage.status === 'done' && (
                                        <CircleCheck className="text-green-700" />
                                    )}
                                    <p>Validate Image</p>
                                </div>
                                {true && (
                                    <button
                                        className="mx-auto flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                                        type="button"
                                        onClick={() =>
                                            handleSelectModal(
                                                ModalType.VIEW_IMAGE_SOURCE,
                                            )
                                        }
                                    >
                                        VIEW IMAGE SOURCE
                                    </button>
                                )}
                            </div>

                            {/* STEP 5: Sign Result */}
                            <div className="flex-1 space-y-3 rounded-xl bg-slate-200/80 px-3 py-2">
                                <div className="flex items-center gap-2 text-xl font-medium text-teal-950">
                                    {signResult.status === 'idle' && (
                                        <Circle className="text-slate-700" />
                                    )}
                                    {/* Add pending, error? */}
                                    {signResult.status === 'done' && (
                                        <CircleCheck className="text-green-700" />
                                    )}
                                    <p>Sign Result</p>
                                </div>
                                {true && (
                                    <button
                                        className="mx-auto flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                                        type="button"
                                        onClick={() =>
                                            handleSelectModal(
                                                ModalType.VIEW_SIGNED_RESULT,
                                            )
                                        }
                                    >
                                        VIEW SIGNED RESULT
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal */}
            <Modal
                title="Generate Challenge"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                {modalType === ModalType.START_ATTESTATION && (
                    <IssueChallengeForm onClose={() => setIsModalOpen(false)} />
                )}
                {modalType === ModalType.VIEW_CHALLENGE && (
                    <div className="space-y-8">
                        <p className="text-lg font-light italic">
                            Your challenge has just been securely dispatched to
                            the confidential VM. It will use this challenge to
                            generate a fresh attestation quote and kick off the
                            remote attestation process. Once the quote is ready,
                            you’ll be able to verify the integrity of the
                            workload and continue to the next step.
                        </p>
                        <div>
                            <h2 className="mb-2 text-xl">
                                Generated Challenge:
                            </h2>
                            <p className="w-fit rounded-lg bg-green-500/50 px-4 py-2 font-medium">
                                {issuedChallenge}
                            </p>
                        </div>
                    </div>
                )}
                {modalType === ModalType.VIEW_EVIDENCE && <p>Evidence</p>}
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
