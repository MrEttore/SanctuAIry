import { Circle, CircleCheck, CircleX, Handshake } from 'lucide-react';
import { IssueChallengeForm } from './IssueChallengeForm';
import { useState } from 'react';
import { Modal } from '../../ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function AttestationTimeline() {
    const { issuedChallenge, attestationQuote } = useSelector(
        (state: RootState) => state.attestation,
    );
    const {
        issueChallenge,
        generateEvidence,
        verifyTee,
        validateImage,
        signResult,
    } = useSelector((state: RootState) => state.attestation.attestationSteps);
    const [isChallengeFormOpen, setChallengeFormOpen] =
        useState<boolean>(false);

    return (
        <>
            <div className="mx-3">
                <div className="flex flex-col space-y-6 rounded-2xl bg-slate-100 p-4 py-2 shadow-md">
                    <div className="">
                        <button
                            className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                            onClick={() => {
                                setChallengeFormOpen(true);
                            }}
                        >
                            <Handshake size={20} />
                            START ATTESTATION
                        </button>

                        {/* TODO: Attestation not available when no communication with backend. */}
                    </div>
                    <div className="">
                        <div className="flex w-full justify-between">
                            {/* TODO: Add reusable step component. */}

                            {/* STEP 1: Issue Challenge */}
                            <div className="space-y-3 rounded-xl bg-slate-200/80 p-4 py-2">
                                <div className="flex items-center gap-2 text-xl font-medium text-teal-950">
                                    {issueChallenge.status === 'idle' && (
                                        <Circle className="text-slate-700" />
                                    )}
                                    {/* Add pending, error? */}
                                    {issueChallenge.status === 'done' && (
                                        <CircleCheck className="text-green-700" />
                                    )}
                                    <p
                                        className={`${issueChallenge.status === 'done' ? 'font-bold text-green-700' : ''}`}
                                    >
                                        Issue Challenge
                                    </p>
                                </div>
                                {issuedChallenge && (
                                    <p className="rounded-md bg-green-700/50 px-2 py-1">
                                        {issuedChallenge}
                                    </p>
                                )}
                            </div>

                            {/* STEP 2: Generate Evidence */}
                            <div className="space-y-3 rounded-xl bg-slate-200/80 p-4 py-2">
                                <div className="flex items-center gap-2 text-xl font-medium text-teal-950">
                                    {generateEvidence.status === 'idle' && (
                                        <Circle className="text-slate-700" />
                                    )}
                                    {/* Add pending, error? */}
                                    {generateEvidence.status === 'done' && (
                                        <CircleCheck className="text-green-700" />
                                    )}
                                    <p>Generate Evidence</p>
                                </div>
                                {true && (
                                    <button
                                        className="mx-auto flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                                        type="button"
                                        onClick={() => {}} // TODO: Open modal to Evidence.
                                    >
                                        VIEW EVIDENCE
                                    </button>
                                )}
                            </div>

                            {/* STEP 3: Verify TEE */}
                            <div className="space-y-3 rounded-xl bg-slate-200/80 p-4 py-2">
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
                                        onClick={() => {}} // TODO: Open modal to Verification Result.
                                    >
                                        VIEW VERIFICATION RESULT
                                    </button>
                                )}
                            </div>

                            {/* STEP 4: Validate Image */}
                            <div className="space-y-3 rounded-xl bg-slate-200/80 p-4 py-2">
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
                                        onClick={() => {}} // TODO: Open modal to Image Source.
                                    >
                                        VIEW IMAGE SOURCE
                                    </button>
                                )}
                            </div>

                            {/* STEP 5: Sign Result */}
                            <div className="space-y-3 rounded-xl bg-slate-200/80 p-4 py-2">
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
                                        onClick={() => {}} // TODO: Open modal to Signed Result.
                                    >
                                        VIEW SIGNED RESULT
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Generate Challenge"
                isOpen={isChallengeFormOpen}
                onClose={() => setChallengeFormOpen(false)}
            >
                <IssueChallengeForm
                    onClose={() => setChallengeFormOpen(false)}
                />
            </Modal>
        </>
    );
}
