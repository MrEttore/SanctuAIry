import { useMutation } from '@tanstack/react-query';
import { Check, CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../../redux/store';
import {
    getChallenge,
    getEvidence,
    setEvidenceInfrastructure,
    setEvidenceQuote,
    setEvidenceWorkloads,
    updateStep,
} from '../../../attestationSlice';
import '../../../services/evidenceProviderApi';
import {
    fetchInfrastructure,
    fetchTdxQuote,
    fetchWorkloads,
} from '../../../services/evidenceProviderApi';
import { Challenge } from '../../../types/attestation';
import { ModalHeader } from '../ModalHeader';

export function FetchEvidence() {
    const dispatch: AppDispatch = useDispatch();
    const { value: challenge } = useSelector(getChallenge) as Challenge;
    const evidence = useSelector(getEvidence);

    const fetchQuoteMutation = useMutation({
        mutationKey: ['fetch-quote-evidence'],
        mutationFn: fetchTdxQuote,
        onSuccess: (quote) => {
            dispatch(setEvidenceQuote(quote));
        },
    });

    const fetchWorkloadMutation = useMutation({
        mutationKey: ['fetch-workload-evidence'],
        mutationFn: fetchWorkloads,
        onSuccess: (workload) => {
            dispatch(setEvidenceWorkloads(workload));
        },
    });

    const fetchInfrastructureMutation = useMutation({
        mutationKey: ['fetch-infrastructure-evidence'],
        mutationFn: fetchInfrastructure,
        onSuccess: (infrastructure) => {
            dispatch(setEvidenceInfrastructure(infrastructure));
        },
    });

    useEffect(() => {
        if (
            evidence?.quote &&
            evidence?.workloads &&
            evidence?.infrastructure
        ) {
            dispatch(updateStep({ step: 'gatherEvidence', status: 'done' }));
            dispatch(updateStep({ step: 'verifyEvidence', status: 'active' }));
        }
    }, [evidence, dispatch]);

    return (
        <div className="text-teal-950">
            <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                <ModalHeader title="Select the Evidence to Retrieve" />

                <div className="divide-y-1 divide-teal-900/10">
                    {/* GET QUOTE */}
                    <div className="grid grid-cols-[70%_auto] gap-x-2 py-2">
                        <div>
                            <h3 className="text-xl font-medium">
                                TDX Attestation Quote
                            </h3>
                            <p className="opacity-80">
                                Gathers evidence that the backend is running
                                inside a genuine confidential execution
                                environment, safeguarding the confidentiality of
                                your personal data.
                            </p>
                            {fetchQuoteMutation.isError && (
                                <p className="flex items-center gap-1 font-medium rounded-md w-fit p-0.5 bg-red-100 text-red-900 mt-1.5">
                                    <CircleX size={15} />
                                    Error: {fetchQuoteMutation.error.message}
                                </p>
                            )}
                        </div>
                        <button
                            className={`rounded-lg px-1 py-0.5 text-base font-semibold transition-all duration-400 shadow-sm h-10 w-1/2 mx-auto my-auto ${
                                fetchQuoteMutation.isPending
                                    ? 'cursor-not-allowed opacity-75 text-white bg-amber-500/80'
                                    : fetchQuoteMutation.isSuccess ||
                                        evidence?.quote
                                      ? 'cursor-default opacity-75 bg-green-800/60 text-green-800'
                                      : 'cursor-pointer bg-amber-500/80 hover:bg-amber-500 text-white'
                            }`}
                            onClick={() =>
                                fetchQuoteMutation.mutate(challenge as string)
                            }
                            disabled={
                                fetchQuoteMutation.isPending ||
                                fetchQuoteMutation.isSuccess
                            }
                        >
                            {fetchQuoteMutation.isPending ? (
                                'Fething...'
                            ) : fetchQuoteMutation.isError ? (
                                'Retry'
                            ) : fetchQuoteMutation.isSuccess ||
                              evidence?.quote ? (
                                <Check className="inline-block" />
                            ) : (
                                'Fetch'
                            )}
                        </button>
                    </div>

                    {/* GET WORKLOADS */}
                    <div className="grid grid-cols-[70%_auto] gap-x-2 py-2">
                        <div>
                            <h3 className="text-xl font-medium">
                                Workload Evidence
                            </h3>
                            <p className="opacity-80">
                                Gathers evidence that proves which containerized
                                workloads are running inside the confidential
                                execution environment.
                            </p>
                            {fetchWorkloadMutation.isError && (
                                <p className="flex items-center gap-1 font-medium rounded-md w-fit p-0.5 bg-red-100 text-red-900 mt-1.5">
                                    <CircleX size={15} />
                                    Error: {fetchWorkloadMutation.error.message}
                                </p>
                            )}
                        </div>
                        <button
                            className={`rounded-lg px-1 py-0.5 text-base font-semibold transition-all duration-400 shadow-sm h-10 w-1/2 mx-auto my-auto ${
                                fetchWorkloadMutation.isPending
                                    ? 'cursor-not-allowed opacity-75 text-white bg-amber-500/80'
                                    : fetchWorkloadMutation.isSuccess ||
                                        evidence?.workloads
                                      ? 'cursor-default opacity-75 bg-green-800/50 text-green-800'
                                      : 'cursor-pointer bg-amber-500/80 hover:bg-amber-500 text-white'
                            }`}
                            onClick={() =>
                                fetchWorkloadMutation.mutate(
                                    challenge as string,
                                )
                            }
                            disabled={
                                fetchWorkloadMutation.isPending ||
                                fetchWorkloadMutation.isSuccess
                            }
                        >
                            {fetchWorkloadMutation.isPending ? (
                                'Fething...'
                            ) : fetchWorkloadMutation.isError ? (
                                'Retry'
                            ) : fetchWorkloadMutation.isSuccess ||
                              evidence?.workloads ? (
                                <Check className="inline-block" />
                            ) : (
                                'Fetch'
                            )}
                        </button>
                    </div>

                    {/* GET INFRASTRUCTURE */}
                    <div className="grid grid-cols-[70%_auto] gap-x-2 py-2">
                        <div>
                            <h3 className="text-xl font-medium">
                                Infrastructure Evidence
                            </h3>
                            <p className="opacity-80">
                                Gathers evidence that provides details about the
                                underlying hardware and software cloud
                                infrastructure of the confidential execution
                                environment.
                            </p>
                            {fetchInfrastructureMutation.isError && (
                                <p className="flex items-center gap-1 font-medium rounded-md w-fit p-0.5 bg-red-100 text-red-900 mt-1.5">
                                    <CircleX size={15} />
                                    Error:{' '}
                                    {fetchInfrastructureMutation.error.message}
                                </p>
                            )}
                        </div>
                        <button
                            className={`rounded-lg px-1 py-0.5 text-base font-semibold transition-all duration-400 shadow-sm h-10 w-1/2 mx-auto my-auto ${
                                fetchInfrastructureMutation.isPending
                                    ? 'cursor-not-allowed opacity-75 text-white bg-amber-500/80'
                                    : fetchInfrastructureMutation.isSuccess ||
                                        evidence?.infrastructure
                                      ? 'cursor-default opacity-75 bg-green-800/50 text-green-800'
                                      : 'cursor-pointer bg-amber-500/80 hover:bg-amber-500 text-white'
                            }`}
                            onClick={() =>
                                fetchInfrastructureMutation.mutate(
                                    challenge as string,
                                )
                            }
                            disabled={
                                fetchInfrastructureMutation.isPending ||
                                fetchInfrastructureMutation.isSuccess
                            }
                        >
                            {fetchInfrastructureMutation.isPending ? (
                                'Fething...'
                            ) : fetchInfrastructureMutation.isError ? (
                                'Retry'
                            ) : fetchInfrastructureMutation.isSuccess ||
                              evidence?.infrastructure ? (
                                <Check className="inline-block" />
                            ) : (
                                'Fetch'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
