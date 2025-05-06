import { useMutation } from '@tanstack/react-query';
import { JsonEditor } from 'json-edit-react';

import { attestationEvidence } from '../../../../dev-data/attestation-evidence';
import { getTdxQuote } from '../../attestationAPI';

export function TeeEvidence() {
    const mutation = useMutation({ mutationFn: getTdxQuote });

    return (
        <div className="mx-3">
            <div className="flex max-h-[500px] flex-col space-y-2 rounded-2xl bg-slate-100 p-2 shadow-md">
                <div className="flex items-center justify-between">
                    <p className="py-1 text-2xl font-semibold text-teal-950">
                        Evidence
                    </p>

                    {/* TEST GET QUOTE */}
                    <button
                        className="h-10 cursor-pointer rounded-xl bg-slate-600 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700 hover:shadow-xl"
                        onClick={() => {
                            mutation.mutate('P6HC1uS4qfAsfg06G2+Aaw==');
                        }}
                    >
                        Get Quote!
                    </button>

                    <button
                        className="h-10 cursor-pointer rounded-xl bg-slate-600 px-4 font-medium text-slate-200 shadow-md transition-colors duration-300 hover:bg-slate-700 hover:shadow-xl"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        DOWNLOAD
                    </button>
                </div>
                <div className="flex-1 overflow-auto">
                    <JsonEditor
                        data={mutation?.data?.data ?? attestationEvidence}
                        viewOnly
                        maxWidth={'100%'}
                    />
                </div>
            </div>
        </div>
    );
}
