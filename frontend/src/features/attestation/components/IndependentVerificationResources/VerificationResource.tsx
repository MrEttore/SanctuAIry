import { Link2 } from 'lucide-react';

type Props = {
    name: string;
    description?: string;
    resourceLink: string;
    linkPlaceholder: string;
};

export function VerificationResource({
    name,
    description,
    resourceLink,
    linkPlaceholder,
}: Props) {
    return (
        <div className="flex flex-col p-4 rounded-lg bg-slate-50">
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm">{description}</p>
            <div className="flex flex-1 items-end">
                <button className="flex items-center gap-1 bg-teal-950/10 h-fit py-0.5 px-1 rounded-md hover:bg-teal-950/20 transition-colors duration-300">
                    <Link2 />
                    <a href={resourceLink} target="_blank">
                        {linkPlaceholder}
                    </a>
                </button>
            </div>
        </div>
    );
}
