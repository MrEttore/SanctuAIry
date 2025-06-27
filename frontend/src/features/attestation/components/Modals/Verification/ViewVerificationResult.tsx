import * as changeCase from 'change-case';
import { JsonEditor, githubDarkTheme } from 'json-edit-react';

import { ArtifactType, VerificationResult } from '../../../types/attestation';
import { ModalHeader } from '../ModalHeader';

type Props = {
    artifactType: ArtifactType;
    verificationResult: VerificationResult;
};

export function ViewVerificationResult({
    verificationResult,
    artifactType,
}: Props) {
    return (
        <div className="text-teal-950">
            <div className="flex flex-col max-h-[70vh] space-y-4">
                <ModalHeader title={changeCase.sentenceCase(artifactType)} />

                <div className="flex-1 overflow-y-auto rounded-md">
                    <JsonEditor
                        data={verificationResult}
                        viewOnly
                        maxWidth={'100%'}
                        theme={githubDarkTheme}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        className="flex h-8 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors duration-300 hover:shadow-xs cursor-pointer bg-teal-900/80 text-white hover:bg-teal-800"
                        onClick={() => {
                            console.log('Download'); // TODO: Add download logic.
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
