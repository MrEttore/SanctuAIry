import { useState } from 'react';
import { ChallengeGenerationMode } from '../../types/attestation';
import { Wand, TriangleAlert, X, Loader } from 'lucide-react';
import { generateAttestationChallenge } from '../../utils/attestation';
import { useMutation } from '@tanstack/react-query';
import { getQuote } from '../../services/attester';
import { useDispatch } from 'react-redux';
import {
    setAttestationQuote,
    setIssuedChallenge,
    updateStep,
} from '../../redux/slices/attestationSlice';
import { AppDispatch } from '../../redux/store';

type Props = {
    onClose: () => void;
};

export function IssueChallengeForm({ onClose }: Props) {
    const dispatch: AppDispatch = useDispatch();
    const { isPending, mutate } = useMutation({
        mutationFn: getQuote,
        mutationKey: ['sendChallenge'],
        onSuccess: (response) => {
            const { data: quote } = response.data;

            // Dispatch to Redux
            dispatch(setIssuedChallenge(challenge));
            dispatch(setAttestationQuote(quote)); // TODO: Bug: quote is not setted in redux state.
            dispatch(updateStep('done'));

            setChallenge('');

            onClose?.();

            console.log(response);

            // Optionally invalidate any related queries
            // ...

            // Maybe show a toast
            // toast.success('Challenge issued!');
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const [challengeGenerationMode, setChallengeGenerationMode] =
        useState<ChallengeGenerationMode>(ChallengeGenerationMode.AUTOMATIC);
    const [challenge, setChallenge] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    function handleGenerateChallenge() {
        const challenge = generateAttestationChallenge();
        setChallenge(challenge);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!challenge) {
            setFormError(
                'Oops! You need to specify a challenge before submitting.',
            );
            return;
        }

        mutate(challenge);
    }

    return (
        <div className="space-y-6">
            <div className="">
                {/* GENERATION MODE SELECTORS */}
                <div className="mx-auto flex w-1/2 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    <button
                        type="button"
                        onClick={() =>
                            setChallengeGenerationMode(
                                ChallengeGenerationMode.AUTOMATIC,
                            )
                        }
                        className={`m-1 flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 font-semibold transition-colors duration-300 ${
                            challengeGenerationMode ===
                            ChallengeGenerationMode.AUTOMATIC
                                ? 'border-slate-600 bg-slate-600 text-slate-50 hover:bg-slate-700'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        } `}
                    >
                        AUTOMATIC
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setChallengeGenerationMode(
                                ChallengeGenerationMode.MANUAL,
                            );
                            setChallenge('');
                        }}
                        className={`m-1 flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 font-semibold transition-colors duration-300 ${
                            challengeGenerationMode ===
                            ChallengeGenerationMode.MANUAL
                                ? 'border-slate-600 bg-slate-600 text-slate-50 hover:bg-slate-700'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        } `}
                    >
                        MANUAL
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
                                className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                                type="button"
                                onClick={handleGenerateChallenge}
                            >
                                <Wand size={18} />
                                RANDOM CHALLENGE
                            </button>
                            <input
                                className="flex-1 rounded-xl border-2 border-slate-600 bg-slate-50 px-4 py-2 text-slate-900"
                                disabled
                                placeholder=""
                                value={challenge}
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
                        className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                        type="button"
                        onClick={() => setChallenge('')}
                    >
                        CLEAR
                    </button>
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-teal-800 hover:shadow-xl"
                        type="submit"
                    >
                        {isPending ? (
                            <p className="flex items-center gap-2">
                                SENDING TO ATTESTER
                                <Loader className="animate-spin" />
                            </p>
                        ) : (
                            'SEND TO ATTESTER'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
