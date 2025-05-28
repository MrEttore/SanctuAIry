import { Circle, CircleCheck, CircleDashed, CircleX } from 'lucide-react';

import { AttestationQuote, Challenge } from '../../types/attestation';

type Props = {
    name: string;
    status: 'idle' | 'pending' | 'done' | 'error';
    artifactName?: string;
    artifactValue?: Challenge | AttestationQuote | null;
    action: () => void;
};

export function AttestationStep({
    name,
    status,
    artifactName,
    artifactValue,
    action,
}: Props) {
    return (
        <div
            className={`flex-1 space-y-3 rounded-lg px-3 py-2 text-xl ${status === 'done' ? 'bg-green-500/10 font-medium' : ''} ${status === 'error' ? 'bg-red-500/20 text-red-700' : ''} ${status === 'idle' ? 'bg-slate-100 text-teal-950' : ''} ${status === 'pending' ? 'bg-yellow-500/50 text-yellow-700' : ''}`}
        >
            <div className="flex items-center gap-2">
                {status === 'idle' && <Circle />}

                {status === 'pending' && (
                    <CircleDashed className="animate-spin" />
                )}

                {status === 'done' && <CircleCheck />}

                {status === 'error' && <CircleX />}
                <p>{name}</p>
            </div>
            <button
                className={`mx-auto flex h-8 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors duration-300 hover:shadow-xs ${!artifactValue ? 'cursor-not-allowed' : 'cursor-pointer'} ${!artifactValue ? 'bg-teal-800/50 text-teal-50' : 'bg-teal-800/80 hover:bg-teal-800 text-teal-50'}`}
                type="button"
                onClick={() => action()}
                disabled={!artifactValue ? true : false}
            >
                {`View ${artifactName ?? '??'}`}
            </button>
        </div>
    );
}
