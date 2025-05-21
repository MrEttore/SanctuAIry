import { Image } from '../../../types/attestation';

type Props = {
    image: Image;
};

export function WorkloadImage({ image }: Props) {
    return (
        <div className="text-sm py-2">
            -{' '}
            {image.repoTags.map((repoTag) => (
                <span className="rounded-lg px-1.5 py-1 bg-teal-800/20 shadow-xs font-medium mr-1">
                    {repoTag}
                </span>
            ))}
        </div>
    );
}
