import * as changeCase from 'change-case';
import {
    Circle,
    CircleDot,
    CircleDotDashed,
    CirclePlus,
    CircleX,
} from 'lucide-react';

import '../../../../types/ui';
import {
    AttestationStepAction,
    AttestationStepArtifact,
    AttestationStepStatus,
} from '../../types/attestation';
import { TrustStatusBadge } from '../TrustStatus';

type Props = {
    name: string;
    status: AttestationStepStatus;
    artifacts: AttestationStepArtifact[];
    action?: AttestationStepAction;
};

export function AttestationStep({ name, status, artifacts, action }: Props) {
    return (
        <div
            className={`flex-1 space-y-3 rounded-lg px-3 py-2 ${status === 'pending' ? 'bg-slate-50 text-teal-950' : status === 'active' ? 'bg-slate-200 text-teal-950' : status === 'done' ? 'bg-slate-300 font-medium' : status === 'error' ? "'bg-red-500/20 text-red-700" : ''}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {status === 'pending' && <Circle />}
                    {status === 'active' && (
                        <CircleDotDashed
                            className="animate-pulse"
                            style={{ animationDuration: '3s' }}
                        />
                    )}
                    {status === 'done' && <CircleDot />}
                    {status === 'error' && <CircleX />}
                    <p className="text-lg font-medium">{name}</p>
                </div>
                {action && status === 'active' && (
                    <button
                        className="flex items-center gap-1.5 rounded-md px-1 py-0.5 text-base font-medium cursor-pointer transition-all duration-400 hover:bg-teal-950/10"
                        onClick={action.fn}
                    >
                        <CirclePlus size={20} />
                        {action.name}
                    </button>
                )}
            </div>

            {artifacts && (
                <div className="divide-y-1 divide-teal-800/10">
                    {artifacts.map((artifact) => (
                        <div
                            key={artifact.name}
                            className={`flex text-base justify-between py-1 ${!artifact.value ? 'opacity-75 font-medium' : 'font-semibold'}`}
                        >
                            <p className="text-teal-950">
                                {changeCase.sentenceCase(artifact.name)}
                            </p>
                            <div className="flex gap-2 items-center">
                                <TrustStatusBadge
                                    forArtifact={artifact.name}
                                    size="sm"
                                    emphasized={artifact.value ? true : false}
                                />
                                <button
                                    className={`flex items-center gap-1.5 rounded-md px-1 py-0.5 font-medium text-sm transition-all duration-400 ${!artifact.value ? 'cursor-default' : 'cursor-pointer not-only:hover:bg-teal-900/10'}`}
                                    type="button"
                                    onClick={artifact.action}
                                    disabled={!artifact.value ? true : false}
                                >
                                    Inspect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
