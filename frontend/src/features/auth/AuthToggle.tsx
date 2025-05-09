type Props = {
    checked: boolean;
    handleChecked: (checked: boolean) => void;
};

export function AuthToggle({ checked, handleChecked }: Props) {
    return (
        <div className="flex items-center justify-center gap-4">
            <span className="md:text-lg text-teal-950">Login as guest</span>
            <label className="relative inline-flex cursor-pointer items-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleChecked(!checked)}
                    className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-all duration-300 peer-checked:bg-teal-600"></div>
                <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-full"></div>
            </label>
        </div>
    );
}
