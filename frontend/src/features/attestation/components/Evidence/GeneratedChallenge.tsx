import { Copy } from 'lucide-react';

type Props = {
    issuedChallenge: string | null;
};

/**
 * Displays the cryptographic challenge issued by the Relying Party.
 * Enables service-agnostic verification, fulfilling verifiability requirement V2.
 * Ensures session specificity and freshness of the attestation process, fulfilling trust minimization requirement TM1.
 */
export function GeneratedChallenge({ issuedChallenge }: Props) {
    return (
        <div className="space-y-8 text-teal-950">
            <h2 id="modal-title" className="text-2xl font-semibold ">
                Generated Challenge
            </h2>
            <div className="flex bg-teal-800/20 shadow-xs font-medium rounded-md items-center space-x-1 justify-between p-2">
                <p className="overflow-x-auto whitespace-nowrap">
                    {issuedChallenge}
                </p>

                {/* TODO: Add copy to clipboard. */}
                <Copy
                    size={33}
                    className="p-1 hover:cursor-pointer hover:bg-teal-800/30 duration-300 transition-all rounded-md"
                />
            </div>

            <p className="text-lg font-normal flex gap-1 bg-teal-800/10 rounded-md px-4 py-2">
                Your challenge has just been securely dispatched to the
                confidential VM. It will use this challenge to generate a fresh
                attestation quote and kick off the remote attestation process.
                Once the quote is ready, you’ll be able to verify the integrity
                of the workload and continue to the next step.
            </p>
        </div>
    );
}
