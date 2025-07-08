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
                        . This will ensures whether or not the AI model is
                        running in a secure and untampered confidential
                        environment.
                    </p>

                    <p>This is how the process works:</p>

                    <ol className="list-decimal list-inside space-y-2 pl-1">
                        <li>
                            <span className="font-semibold">
                                📤 Challenge Creation:
                            </span>{' '}
                            A random 64-byte challenge is generated to uniquely
                            identify your verification session and prevent
                            replay attacks.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📡 Evidence Collection:
                            </span>{' '}
                            SanctuAIry's confidential execution environment
                            responds with signed evidence about its state.
                        </li>
                        <li>
                            <span className="font-semibold">
                                🔐 Evidence Verification:
                            </span>{' '}
                            An external Verifier service checks the Authenticity
                            and Integrity the backend by comparing the evidence
                            against known-good reference values.
                        </li>
                        <li>
                            <span className="font-semibold">
                                📬 Result Delivery:
                            </span>{' '}
                            A signed attestation result is returned and
                            displayed here, so you can decide whether to trust
                            our service.
                        </li>
                    </ol>

                    <p>
                        <span className="font-semibold">Why this matters:</span>
                        <br />
                        It empowers you to independently verify that the
                        confidential execution environment and the AI model
                        handling your data are authentic, secure, and behaving
                        as claimed.
                    </p>
                </div>
            </div>
        </div>
    );
}
