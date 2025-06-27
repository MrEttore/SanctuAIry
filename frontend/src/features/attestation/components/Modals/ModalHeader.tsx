type Props = {
    title?: string;
    icon?: React.ReactNode;
};

export function ModalHeader({ title, icon }: Props) {
    return (
        <h2 className="text-2xl font-medium flex items-center gap-2 text-teal-950">
            {icon}
            {title}
        </h2>
    );
}
