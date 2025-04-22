import { useState } from 'react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getModel } from '../../redux/slices/llmSlice';

export function AttestationSummary() {
    const llm = useSelector(getModel);
    const [isTrusted, setIsTrusted] = useState<boolean>(true);

    return (
        <div className="mx-3">
            <div
                className={`space-y-4 rounded-2xl border-2 bg-slate-200 p-2 shadow-md ${isTrusted ? 'border-teal-900/50' : 'border-red-800/50'} `}
            >
                <div className="flex justify-between">
                    <div
                        className={`flex w-fit items-center gap-1 rounded-2xl px-2 py-1 text-2xl ${isTrusted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                    >
                        <span>{isTrusted ? <ShieldCheck /> : <ShieldX />}</span>
                        <p className="font-semibold">
                            {isTrusted ? 'Trusted' : 'Untrusted'}
                        </p>
                    </div>
                    <button
                        className="cursor-pointer rounded-2xl bg-teal-700 px-4 font-medium text-slate-200 inset-ring-2 inset-ring-teal-900 transition-colors duration-300 hover:bg-teal-900 hover:shadow-2xl"
                        onClick={() => {
                            setIsTrusted(!isTrusted); // TODO: Add attestation refresh logic.
                        }}
                    >
                        Refresh
                    </button>
                </div>
                <div className="grid grid-cols-[1fr_6fr] gap-x-4 gap-y-2">
                    <div>
                        <p className="font-medium">LLM model used:</p>
                    </div>
                    <div className="flex gap-4">
                        <p>{llm.name}</p>
                        <span>
                            (sha256:5b1c97e01e3bf873b71a9abaf10d6cfe3df26937791e84657e231b10f83ca03b)
                        </span>
                    </div>
                    <div>
                        <p className="font-medium">TEE provider: </p>
                    </div>
                    <div>Google Cloud Platform | Intel TDX</div>
                    <div>
                        <p className="font-medium">Timestamp: </p>
                    </div>
                    <div>{new Date().toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
