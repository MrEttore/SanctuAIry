import { TrustStatusBadge } from './TrustStatusBadge';

export function TrustStatus() {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl mb-6 font-semibold text-teal-900 px-2">
                Trust Status
            </h2>
            <div className="space-y-3 text-teal-950 p-2 rounded-2xl">
                <TrustStatusBadge />
            </div>
        </div>
    );
}
