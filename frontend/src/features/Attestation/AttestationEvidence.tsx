import { JsonEditor } from 'json-edit-react';
import { attestationEvidence } from '../../dev-data/attestation-evidence';

export function AttestationEvidence() {
    return (
        <div className="mx-3">
            <div className="flex max-h-[500px] flex-col rounded-2xl border-2 border-teal-900/50 bg-slate-200 p-2 shadow-md">
                <div className="flex items-center justify-between">
                    <p className="py-1 text-2xl font-semibold text-teal-950">
                        Evidence
                    </p>
                    <button
                        className="cursor-pointer rounded-xl bg-teal-700 px-4 py-1 font-medium text-slate-200 ring-2 ring-teal-900 transition-colors duration-300 hover:bg-teal-900 hover:shadow-2xl"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        Download
                    </button>
                </div>
                <div className="flex-1 overflow-auto">
                    <JsonEditor
                        data={attestationEvidence}
                        viewOnly
                        maxWidth={'100%'}
                    />
                </div>
            </div>
        </div>
    );
}
