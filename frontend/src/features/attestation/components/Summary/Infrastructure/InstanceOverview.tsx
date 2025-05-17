import { JsonEditor, githubDarkTheme } from 'json-edit-react';

import { ConfidentialInstance } from '../../../../../types/attestation';

type Props = {
    instanceData: ConfidentialInstance | null;
    instanceName: string | undefined;
};

export function InstanceOverview({ instanceData, instanceName }: Props) {
    return (
        <div className="text-slate-800">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <div className="flex items-center justify-between">
                    <p className="py-1 text-2xl font-semibold text-teal-950">
                        {`Inspect "${instanceName ?? 'Unknown'}"`}
                    </p>
                </div>

                {/* EVIDENCE */}
                <div className="flex-1 overflow-y-auto">
                    {instanceData ? (
                        <JsonEditor
                            data={instanceData}
                            viewOnly
                            maxWidth={'100%'}
                            theme={githubDarkTheme}
                        />
                    ) : (
                        <p className="font-medium text-xl flex items-center justify-center rounded-xl bg-orange-800/20 px-4 py-2 text-orange-900">
                            No evidence available
                        </p>
                    )}
                </div>

                {/* DOWNLOAD */}
                {/* <div className="flex justify-end">
                    <button
                        className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-600 px-4 font-medium text-slate-200 transition-colors duration-300 hover:bg-slate-700 hover:shadow-md"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        DOWNLOAD
                    </button>
                </div> */}
            </div>
        </div>
    );
}
