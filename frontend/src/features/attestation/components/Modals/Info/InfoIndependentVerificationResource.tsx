import { Info } from 'lucide-react';

import { ModalHeader } from '../ModalHeader';

export function InfoIndependentVerificationResource() {
    return (
        <div className="flex flex-col max-h-[70vh] space-y-4 overflow-y-auto pr-2">
            <ModalHeader
                title=" About the Independent Verification"
                icon={<Info />}
            />
            <p>
                This section gives you access to all the public artifacts used
                in the verification process of the SanctuAIry service. You can
                independently inspect the workload images, retrieve the same
                baseline manifest used by the verifier, and even run your own
                instance of the verifier service locally. These resources allow
                you, or any third party, to re-execute the attestation process
                and reach an identical trust decision without relying completely
                on our "Remote Attestation" feature. It’s a transparent,
                reproducible path to trust that we offer to you.
            </p>
        </div>
    );
}
