import { Container } from '../../../types/attestation';

type Props = {
    container: Container;
};

export function WorkloadContainer({ container }: Props) {
    return (
        <div className="text-sm py-2">
            -{' '}
            <span className="rounded-lg px-1.5 py-1 bg-teal-800/20 shadow-xs font-medium">
                {container.name}
            </span>{' '}
            runs{' '}
            <span className="rounded-lg px-1.5 py-1 bg-teal-800/20 shadow-xs font-medium">
                {container.image}
            </span>
        </div>
    );
}
