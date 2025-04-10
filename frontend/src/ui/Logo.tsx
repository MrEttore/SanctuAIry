import logo from '../assets/Logo-Teal-50.svg';

type Props = {
    furtherStyles?: string;
};

export function Logo({ furtherStyles }: Props) {
    return (
        <div
            className={`flex cursor-pointer items-center justify-center ${furtherStyles}`}
        >
            <img src={logo} alt="Logo" className="h-40 w-40"></img>
            <p className="my-4 text-5xl text-teal-50">
                Sanctu<span className="font-semibold">AI</span>ry
            </p>
        </div>
    );
}
