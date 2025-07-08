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
                            verify the Confidentiality, Authenticity, and
                            Integrity
                        </span>{' '}
                        of SanctuAIry's AI model execution environment, the
                        model itself, and the data it processes.
                    </p>

                    <p>
                        When you use{' '}
                        <span className="font-semibold">SanctuAIry</span>, your
                        personal medical information is handled by an AI model
                        running inside a{' '}
                        <span className="font-semibold">
                            Confidential Computing environment
                        </span>
                        , a special kind of cloud system that encrypts and
                        isolates the AI inference processing your sensitive
                        data.
                    </p>

                    <p>
                        To make our confidentiality claims{' '}
                        <span className="font-semibold">verifiable</span>, we
                        empower you to use a technology called{' '}
                        <span className="font-semibold">
                            Remote Attestation
                        </span>
                        . It generates cryptographic evidence proving:
                    </p>

                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            🧠 That the SanctuAIry's AI model you’re interacting
                            with is authentic and untampered
                        </li>
                        <li>
                            🖥️ That it’s running in a secure and isolated
                            environment protecting your sensitive data
                        </li>
                        <li>
                            ☁️ That the system has been deployed on a cloud
                            platform using authenticated confidential
                            technologies
                        </li>
                    </ul>

                    <p>
                        This page shows you the results of these checks in real
                        time and gives you tools to inspect and validate them
                        yourself.
                    </p>

                    <p>
                        <span className="font-semibold">The Bottom Line:</span>
                        <br />
                        Instead of taking our word for it, you can actually{' '}
                        <span className="font-semibold">see proof</span> that
                        your sensitive information is in safe hands.
                    </p>
                </div>
            </div>
        </div>
    );
}
