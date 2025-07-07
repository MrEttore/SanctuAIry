import { VerificationResource } from './VerificationResource';

export default function IndependentVerificationResources() {
    return (
        <section className="mx-2">
            <div className="flex flex-col space-y-4 rounded-lg bg-white p-2 shadow-md text-teal-950">
                {/* TODO: ENHANCE HEADER */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-medium">
                        Resources for Independent Verification
                    </h2>
                </div>

                <div className="grid grid-cols-1 h-96 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <VerificationResource
                        name={`SanctuAIry's AI model`}
                        description="The LLM model we use for inference, available as a Docker image."
                        resourceLink="https://hub.docker.com/repository/docker/sanctuairy/llm-core"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's AI model manager service`}
                        description="The API service that manages SanctuAIry's AI model, available as a Docker image."
                        resourceLink="https://hub.docker.com/repository/docker/sanctuairy/llm-manager"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's frontend`}
                        description="The web interface for interacting with SanctuAIry, available as a Docker image."
                        resourceLink="https://hub.docker.com/repository/docker/sanctuairy/frontend"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`Attestify's verifier service`}
                        description="The open-source and Independent verifier service used to verify the integrity of SanctuAIry's AI model and its confidential execution environment."
                        resourceLink="https://github.com/MrEttore/Attestify"
                        linkPlaceholder="View on GitHub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's baseline manifest`}
                        description="The baseline manifest used by Attestify to verify SanctuAIry's AI model and its environment."
                        resourceLink="https://github.com/MrEttore/SanctuAIry-baseline-manifests"
                        linkPlaceholder="View on GitHub"
                    />
                </div>
            </div>
        </section>
    );
}
