import { useState } from 'react';
import { ShieldCheck, ShieldX, ShieldQuestion, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getModel } from '../../redux/slices/chatSlice';
import { TrustStatus } from '../../types/attestation';

export function AttestationSummary() {
    const model = useSelector(getModel);
    const [trustStatus, setTrustStatus] = useState<TrustStatus>(
        TrustStatus.UNKNOWN,
    );

    return (
        <div className="mx-3 mt-3">
            <div
                className={`space-y-4 rounded-2xl p-2 shadow-md ${trustStatus === TrustStatus.TRUSTED && 'bg-green-50'} ${trustStatus === TrustStatus.UNTRUSTED && 'bg-red-50'} ${trustStatus === TrustStatus.UNKNOWN && 'bg-slate-100'}`}
            >
                <div className="flex justify-between">
                    <div
                        className={`flex w-fit items-center gap-1 rounded-xl px-2 py-1 text-2xl font-semibold ${trustStatus === TrustStatus.TRUSTED && 'bg-green-200 text-green-800'} ${trustStatus === TrustStatus.UNTRUSTED && 'bg-red-200 text-red-800'} ${trustStatus === TrustStatus.UNKNOWN && 'bg-slate-200 text-slate-800'}`}
                    >
                        <span>
                            {trustStatus === TrustStatus.TRUSTED && (
                                <ShieldCheck />
                            )}
                            {trustStatus === TrustStatus.UNTRUSTED && (
                                <ShieldX />
                            )}
                            {trustStatus === TrustStatus.UNKNOWN && (
                                <ShieldQuestion />
                            )}
                        </span>
                        <p className="capitalize">{trustStatus}</p>
                    </div>
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700 hover:shadow-xl"
                        onClick={() => {
                            setTrustStatus(TrustStatus.TRUSTED); // TODO: Add attestation refresh logic.
                        }}
                    >
                        <RefreshCw />
                        REFRESH
                    </button>
                </div>
                <div className="grid grid-cols-[1fr_6fr] gap-x-4 gap-y-2">
                    <div>
                        <p className="font-semibold">LLM model used:</p>
                    </div>
                    <div className="flex gap-4">
                        <p>{model?.name}</p>
                        <span>(sha256:5b1c97e01...)</span>
                    </div>
                    <div>
                        <p className="font-semibold">TEE provider: </p>
                    </div>
                    <div>Google Cloud Platform | Intel TDX</div>
                    <div>
                        <p className="font-semibold">Timestamp: </p>
                    </div>
                    <div>{new Date().toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
