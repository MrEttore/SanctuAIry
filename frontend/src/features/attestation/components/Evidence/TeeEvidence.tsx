import { JsonEditor, githubLightTheme } from 'json-edit-react';
import { useSelector } from 'react-redux';

import { dummyAttestationEvidence } from '../../../../dev-data/attestation-evidence';
import { getAttestationQuote } from '../../attestationSlice';

export function TeeEvidence() {
    const attestationQuote = useSelector(getAttestationQuote);

    return (
        <div className="text-slate-800">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <div className="flex items-center justify-between">
                    <p className="py-1 text-2xl font-semibold text-teal-950">
                        Generated TEE Evidence
                    </p>
                </div>

                {/* EVIDENCE */}
                <div className="flex-1 overflow-y-auto">
                    <JsonEditor
                        data={attestationQuote || dummyAttestationEvidence}
                        viewOnly
                        maxWidth={'100%'}
                        theme={githubLightTheme}
                    />
                </div>

                {/* DOWNLOAD */}
                <div className="flex justify-end">
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        DOWNLOAD
                    </button>
                </div>
            </div>
        </div>
    );
}
