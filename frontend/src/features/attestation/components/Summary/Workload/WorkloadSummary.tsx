import { ExternalLink } from 'lucide-react';

export function WorkloadSummary() {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl mb-6 font-semibold text-teal-900 px-2">
                Confidential Workload
            </h2>
            <div className="space-y-3 text-teal-950 p-2 rounded-2xl text-lg">
                <div className="flex items-center justify-between">
                    <p>Running Containers</p>
                    <p className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium bg-teal-800/30">
                        1
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p>
                        {/* TODO: Get confidential techn. */}
                        Container
                    </p>
                    <button className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 font-medium bg-teal-800/30 cursor-pointer hover:bg-teal-800/40 transition-all duration-300 hover:shadow">
                        llm-core
                        <ExternalLink size={15} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <p>
                        {/* TODO: Get VM identity */}
                        Container Image
                    </p>
                    <button className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 font-medium bg-teal-800/30 cursor-pointer hover:bg-teal-800/40 transition-all duration-300 hover:shadow">
                        llm-core:latest
                        <ExternalLink size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
}
