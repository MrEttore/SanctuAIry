type Props = {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
};

export function AuthInput({
    label,
    placeholder,
    type,
    value,
    setValue,
}: Props) {
    return (
        <div className="flex w-1/2 flex-col items-center gap-2">
            <label htmlFor={label} className="text-teal-950">
                {label.charAt(0).toUpperCase() + label.slice(1)}:
            </label>
            <input
                className="w-full rounded-xl bg-teal-900 p-2 text-teal-50 shadow-xl transition-all duration-300 hover:bg-teal-800 hover:ring-1 hover:ring-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                id={label}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
