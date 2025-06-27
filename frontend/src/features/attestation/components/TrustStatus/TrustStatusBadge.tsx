import { BadgeAlert, BadgeCheck, BadgeHelp } from 'lucide-react';
import { useSelector } from 'react-redux';

import { getVerification } from '../../attestationSlice';
import {
    ArtifactType,
    TrustStatus,
    VerificationStatus,
} from '../../types/attestation';
import { computeTrustStatus } from '../../utils/computeVerification';

type Props = {
    forArtifact: ArtifactType;
    size?: 'sm' | 'md';
    emphasized?: boolean;
};

export function TrustStatusBadge({
    forArtifact,
    size = 'sm',
    emphasized = false,
}: Props) {
    const verification = useSelector(getVerification);
    const trustStatus = computeTrustStatus(forArtifact, verification);

    return (
        <div
            className={`flex items-center gap-1 ${size === 'sm' ? 'text-sm' : ''} ${size === 'md' ? 'text-base' : ''} ${emphasized ? 'font-semibold' : 'opacity-75 font-medium'} ${trustStatus === TrustStatus.TRUSTED || trustStatus === VerificationStatus.PASSED ? 'text-green-700' : trustStatus === TrustStatus.UNTRUSTED || trustStatus === VerificationStatus.FAILED ? 'text-red-700' : 'text-yellow-700'}`}
        >
            <span>
                {(trustStatus === TrustStatus.TRUSTED ||
                    trustStatus === VerificationStatus.PASSED) && (
                    <BadgeCheck size={size === 'sm' ? 18 : 25} />
                )}
                {(trustStatus === TrustStatus.UNTRUSTED ||
                    trustStatus === VerificationStatus.FAILED) && (
                    <BadgeAlert size={size === 'sm' ? 18 : 25} />
                )}
                {(trustStatus === TrustStatus.UNKNOWN ||
                    trustStatus === VerificationStatus.PENDING) && (
                    <BadgeHelp size={size === 'sm' ? 18 : 25} />
                )}
            </span>
            <p className="capitalize">{trustStatus}</p>
        </div>
    );
}
