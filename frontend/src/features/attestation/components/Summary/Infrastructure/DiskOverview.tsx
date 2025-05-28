import { JsonEditor, githubDarkTheme } from 'json-edit-react';
import { HardDrive } from 'lucide-react';

import { Disk } from '../../../types/attestation';

type Props = {
    diskData: Disk | null;
    diskName: string | undefined;
};

export function DiskOverview({ diskData, diskName }: Props) {
    return (
        <div>
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <div className="relative w-full flex items-center justify-center py-1">
                    <span className="absolute left-0 bottom-0 text-xl pl-2 text-teal-900/80 flex items-center gap-1">
                        <HardDrive size={20} />
                        Disk
                    </span>
                    <span className="ml-1 text-2xl font-semibold text-teal-900">{`${diskName ?? 'Unknown'}`}</span>
                </div>

                {/* EVIDENCE */}
                <div className="flex-1 overflow-y-auto">
                    {diskData ? (
                        <JsonEditor
                            data={diskData}
                            viewOnly
                            maxWidth={'100%'}
                            theme={githubDarkTheme}
                        />
                    ) : (
                        <p className="font-medium text-xl flex items-center justify-center rounded-xl bg-orange-800/20 px-4 py-2 text-orange-900">
                            No disk data available
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
