type Props = {
    name: string;
    value: string;
};

export function InstanceAttribute({ name, value }: Props) {
    return (
        <div className="flex justify-between items-center">
            <p>{name}</p>
            <p
                className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 bg-teal-800/20 shadow-xs font-medium`}
            >
                {value ?? 'Unknown'}
            </p>
        </div>
    );
}
