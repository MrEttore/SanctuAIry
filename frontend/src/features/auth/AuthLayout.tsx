import { Logo } from '../../ui';

type Props = {
    title: string;
    children: React.ReactNode;
};

export function AuthLayout({ title, children }: Props) {
    return (
        <div className="flex w-full flex-col bg-linear-to-tr from-teal-950 from-50% to-slate-700">
            <div className="flex h-1/4 items-center justify-center">
                <Logo />
            </div>

            <div className="flex justify-center">
                <div className="flex w-10/12 md:w-1/3 flex-col rounded-4xl bg-teal-50 p-4 shadow-2xl">
                    <div className="mb-4">
                        <p className="my-4 text-center text-3xl md:text-4xl font-medium text-teal-950">
                            {title}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
