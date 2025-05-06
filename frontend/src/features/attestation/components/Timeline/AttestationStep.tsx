import { Circle, CircleCheck, CircleDashed, CircleX } from 'lucide-react';

import { ModalType } from '../../types/ui';

type Props = {
    name: string;
    status: 'idle' | 'pending' | 'done' | 'error';
    artifact: boolean;
    action: (modalType: ModalType) => void;
    actionType: ModalType;
};

export function AttestationStep({
    name,
    status,
    artifact,
    action,
    actionType,
}: Props) {
    return (
        <div
            className={`flex-1 space-y-3 rounded-xl px-3 py-2 text-xl ${status === 'done' ? 'bg-green-500/20 text-green-700' : ''} ${status === 'error' ? 'bg-red-500/20 text-red-700' : ''} ${status === 'idle' ? 'bg-slate-200/80 text-teal-950' : ''} ${status === 'pending' ? 'bg-yellow-500/50 text-yellow-700' : ''}`}
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

            {artifact && (
                <button
                    className="mx-auto flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-500/60 px-4 text-sm font-medium text-slate-700 transition-colors duration-300 hover:bg-slate-500/80 hover:shadow-xs"
                    type="button"
                    onClick={() => action(actionType)}
                >
                    {/* TODO: Update to natural language */}
                    {actionType}
                </button>
            )}
        </div>
    );
}
