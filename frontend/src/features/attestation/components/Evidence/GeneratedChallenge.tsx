import { Copy } from 'lucide-react';

type Props = {
    issuedChallenge: string | null;
};

export function GeneratedChallenge({ issuedChallenge }: Props) {
    return (
        <div className="space-y-8 text-slate-800">
            <h2 id="modal-title" className="text-2xl font-semibold ">
                Generated Challenge
            </h2>
            <div className="flex bg-green-500/30 rounded-md shadow-xs items-center space-x-1 justify-between p-2">
                <p className="overflow-x-auto whitespace-nowrap">
                    {issuedChallenge}
                </p>
                {/* TODO: Add copy to clipboard. */}
                <Copy
                    size={33}
                    className="p-1 hover:cursor-pointer hover:bg-green-500/30 duration-300 transition-all rounded-md"
                />
            </div>

            <p className="text-lg font-light flex gap-1 bg-slate-300/30 rounded-md px-4 py-2">
                Your challenge has just been securely dispatched to the
                confidential VM. It will use this challenge to generate a fresh
                attestation quote and kick off the remote attestation process.
                Once the quote is ready, you’ll be able to verify the integrity
                of the workload and continue to the next step.
            </p>
        </div>
    );
}
