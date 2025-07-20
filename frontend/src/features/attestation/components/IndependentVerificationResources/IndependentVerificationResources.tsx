import { Header } from './Header';
import { VerificationResource } from './VerificationResource';

export default function IndependentVerificationResources() {
    return (
        <section className="mx-2">
            <div className="flex flex-col space-y-4 rounded-lg bg-white p-2 shadow-md text-teal-950">
                <Header />
                <div className="grid grid-cols-1 h-96 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <VerificationResource
                        name={`SanctuAIry's AI model`}
                        description="The LLM model we use to process your medical data, available as a Docker image."
                        resourceLink="https://hub.docker.com/r/sanctuairy/llm-core/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's AI model manager service`}
                        description="The API service that manages SanctuAIry's AI model, available as a Docker image."
                        resourceLink="https://hub.docker.com/r/sanctuairy/llm-manager/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's frontend`}
                        description="The web interface for interacting with SanctuAIry, available as a Docker image."
                        resourceLink="https://hub.docker.com/r/sanctuairy/frontend/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`Attestify's verifier service`}
                        description="The open-source and independent verifier service used to verify the integrity of SanctuAIry's AI model and its confidential execution environment."
                        resourceLink="https://hub.docker.com/r/attestify/evidenceverifier/tags"
                        linkPlaceholder="View on Docker Hub"
                    />
                    <VerificationResource
                        name={`SanctuAIry's baseline manifest`}
                        description="The baseline manifest used by Attestify's verifier service to audit SanctuAIry's AI model and its execution environment."
                        resourceLink="https://github.com/MrEttore/SanctuAIry-baseline-manifests"
                        linkPlaceholder="View on GitHub"
                    />
                </div>
            </div>
        </section>
    );
}
