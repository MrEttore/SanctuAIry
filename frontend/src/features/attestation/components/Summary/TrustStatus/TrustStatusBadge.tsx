import { ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-react';
import { useState } from 'react';

import { TrustStatus } from '../../../../../types/attestation';

export function TrustStatusBadge() {
    const [trustStatus /*, setTrustStatus*/] = useState<TrustStatus>(
        TrustStatus.UNKNOWN,
    );

    return (
        <div
            className={`flex w-fit items-center gap-1 rounded-xl px-2 py-1 text-2xl font-medium ${trustStatus === TrustStatus.TRUSTED && 'bg-green-200 text-green-800'} ${trustStatus === TrustStatus.UNTRUSTED && 'bg-red-200 text-red-800'} ${trustStatus === TrustStatus.UNKNOWN && 'bg-slate-200 text-slate-800'}`}
        >
            <span>
                {trustStatus === TrustStatus.TRUSTED && <ShieldCheck />}
                {trustStatus === TrustStatus.UNTRUSTED && <ShieldX />}
                {trustStatus === TrustStatus.UNKNOWN && <ShieldQuestion />}
            </span>
            <p className="capitalize">{trustStatus}</p>
        </div>
    );
}
