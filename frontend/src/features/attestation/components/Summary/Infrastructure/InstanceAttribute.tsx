import * as changeCase from 'change-case';

type Props = {
    name: string;
    value: string;
};

export function InstanceAttribute({ name, value }: Props) {
    console.log(name);
    return (
        <div className="flex justify-between items-center">
            <p>{changeCase.sentenceCase(name)}:</p>
            <p
                className={`text-sm flex items-center gap-1.5 rounded-lg px-1.5 py-1 font-semibold`}
            >
                {value ?? 'Unknown'}
            </p>
        </div>
    );
}
