import { TriangleAlert, Wand, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../../../redux/store';
import { setChallenge, updateStep } from '../../../attestationSlice';
import { Challenge, ChallengeGenerationMode } from '../../../types/attestation';
import { generateChallenge } from '../../../utils/generateChallenge';
import { ModalHeader } from '../ModalHeader';

type Props = {
    onClose: () => void;
};

/**
 * Implements the cryptographic challenge generation by the Relying Party.
 * Ensures session specificity and freshness of the attestation process, fulfilling trust minimization requirement TM1.
 * Guarantees intermediary-agnostic evidence flow, fulfilling trust minimization requirement TM3.
 */
export function GenerateChallenge({ onClose }: Props) {
    const [challengeGenerationMode, setChallengeGenerationMode] =
        useState<ChallengeGenerationMode>(ChallengeGenerationMode.AUTOMATIC);
    const [generatedChallenge, setGeneratedChallenge] = useState<Challenge>('');
    const [formError, setFormError] = useState<string>('');

    const dispatch: AppDispatch = useDispatch();

    function handleGenerateChallenge() {
        setGeneratedChallenge(generateChallenge());
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!generatedChallenge) {
            setFormError(
                'Oops! You need to specify a challenge before submitting.',
            );
            return;
        }
        dispatch(setChallenge(generatedChallenge));
        dispatch(updateStep({ step: 'generateChallenge', status: 'done' }));
        dispatch(updateStep({ step: 'gatherEvidence', status: 'active' }));
        onClose?.();
    }

    return (
        <div className="space-y-6 text-teal-950">
            <ModalHeader title="Generate Challenge" />
            <div>
                {/* GENERATION MODE SELECTORS */}
                <div className="mx-auto flex w-1/2 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    <button
                        className={`m-1 flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 font-medium transition-colors duration-300 ${
                            challengeGenerationMode ===
                            ChallengeGenerationMode.AUTOMATIC
                                ? 'border-transparent bg-slate-700/80 text-slate-50 hover:bg-slate-700'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        } `}
                        type="button"
                        onClick={() =>
                            setChallengeGenerationMode(
                                ChallengeGenerationMode.AUTOMATIC,
                            )
                        }
                    >
                        Automatic
                    </button>
                    <button
                        className={`m-1 flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 font-medium transition-colors duration-300 ${
                            challengeGenerationMode ===
                            ChallengeGenerationMode.MANUAL
                                ? 'border-transparent bg-slate-700/80 text-slate-50 hover:bg-slate-700'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        } `}
                        type="button"
                        onClick={() => {
                            setChallengeGenerationMode(
                                ChallengeGenerationMode.MANUAL,
                            );
                            setChallenge('');
                        }}
                    >
                        Manual
                    </button>
                </div>
            </div>
            <form
                className="flex flex-col justify-between"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    {/* CHALLENGE GENERATOR */}
                    {challengeGenerationMode ===
                        ChallengeGenerationMode.AUTOMATIC && (
                        <div className="flex items-center gap-2">
                            <button
                                className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-slate-700/80 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 shadow-sm"
                                type="button"
                                onClick={handleGenerateChallenge}
                            >
                                <Wand size={18} />
                                Randomize
                            </button>
                            <input
                                className="flex-1 rounded-lg border-2 border-slate-600 bg-slate-50 px-4 py-2 text-slate-900"
                                disabled
                                placeholder=""
                                value={generatedChallenge ?? ''}
                            ></input>
                        </div>
                    )}

                    {/* TODO: MANUAL CHALLENGE */}
                    {challengeGenerationMode ===
                        ChallengeGenerationMode.MANUAL && (
                        <div className="flex gap-2 font-bold text-yellow-600 italic">
                            Under construction ...
                        </div>
                    )}
                </div>

                {/* TODO: Create reusable error component ... */}
                {formError && (
                    <p className="mb-5 flex w-fit gap-1 rounded-xl bg-orange-300 p-2 font-semibold text-orange-900">
                        <TriangleAlert />
                        {formError}
                        <button
                            className="cursor-pointer rounded-full bg-orange-400/50 p-1 hover:bg-orange-400"
                            onClick={() => setFormError('')}
                        >
                            <X size={18} />
                        </button>
                    </p>
                )}

                {/* FORM CONTROL BUTTONS */}
                <div className="flex items-end justify-end gap-2">
                    <button
                        className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-slate-700/80 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 shadow-sm"
                        type="button"
                        onClick={() => setGeneratedChallenge('')}
                    >
                        Clear
                    </button>
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-teal-800/80 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-teal-800 shadow-sm"
                        type="submit"
                    >
                        Generate
                    </button>
                </div>
            </form>
        </div>
    );
}
