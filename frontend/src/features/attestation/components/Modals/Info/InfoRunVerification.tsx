import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoRunVerification() {
    return (
        <div className="text-teal-950">
            <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                <ModalHeader
                    title="What Happens During Verification"
                    icon={<Info />}
                />

                <div className="flex-1 space-y-3">
                    <p>
                        Clicking the{' '}
                        <span className="font-semibold">START ATTESTATION</span>{' '}
                        button starts a process called{' '}
                        <span className="font-semibold">
                            Remote Attestation
                        </span>
                        . This ensures the AI backend is running in a secure and
                        untampered environment.
                    </p>

                    <p>This is how the process works:</p>

                    <ol className="list-decimal list-inside space-y-2 pl-1">
                        <li>
                            <span className="font-semibold">
                                📤 Challenge Creation:
                            </span>{' '}
                            A random 64-byte challenge is generated to uniquely
                            identify this session and prevent replay attacks.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📡 Evidence Collection:
                            </span>{' '}
                            The backend (running in a Confidential VM) responds
                            with signed evidence about its system state.
                        </li>
                        <li>
                            <span className="font-semibold">
                                🔐 Evidence Verification:
                            </span>{' '}
                            An external verifier checks the authenticity,
                            integrity, and configuration of the backend by
                            comparing the evidence against known-good reference
                            values.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📬 Result Delivery:
                            </span>{' '}
                            A signed attestation result is returned and
                            displayed here, so you can decide whether to trust
                            the service.
                        </li>
                    </ol>

                    <p>
                        <span className="font-semibold">Why this matters:</span>
                        <br />
                        It empowers you to independently verify that the backend
                        handling your data is authentic, secure, and behaving as
                        claimed.
                    </p>
                </div>
            </div>
        </div>
    );
}
