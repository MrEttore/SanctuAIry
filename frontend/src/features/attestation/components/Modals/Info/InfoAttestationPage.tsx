import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoAttestationPage() {
    return (
        <div className="text-teal-950">
            <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                <ModalHeader
                    title="Service Verification Explained"
                    icon={<Info />}
                />

                <div className="flex-1 space-y-3">
                    <p>
                        This page allows you to{' '}
                        <span className="font-semibold">
                            verify the Authenticity and Integrity
                        </span>{' '}
                        of SanctuAIry's AI model that processes your data.
                    </p>

                    <p>
                        When you use{' '}
                        <span className="font-semibold">SanctuAIry</span>, your
                        personal information is handled by services running
                        inside a{' '}
                        <span className="font-semibold">
                            Confidential Computing environment
                        </span>
                        , a special kind of cloud system that encrypts and
                        isolates all data and code during processing.
                    </p>

                    <p>
                        To make this trust{' '}
                        <span className="font-semibold">verifiable</span>, we
                        use a technology called{' '}
                        <span className="font-semibold">
                            Remote Attestation
                        </span>
                        . It generates cryptographic evidence proving:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            🧠 That the AI model you’re interacting with is
                            authentic and untampered
                        </li>
                        <li>
                            🖥️ That it’s running in a secure hardware-isolated
                            environment
                        </li>
                        <li>🗂️ That the backend code has not been altered</li>
                    </ul>

                    <p>
                        This page shows you the results of those checks in real
                        time and gives you tools to inspect and validate them
                        yourself.
                    </p>

                    <p>
                        <span className="font-semibold">Why this matters:</span>
                        <br />
                        It means you don’t have to blindly trust that your data
                        is handled securely - you can actually{' '}
                        <span className="font-semibold">see and verify it</span>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
