import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-1/3 space-y-10 rounded-xl bg-slate-100 p-3 shadow-2xl">
                <h2
                    id="modal-title"
                    className="text-xl font-bold text-slate-900 uppercase"
                >
                    {title}
                </h2>
                <button
                    className="absolute top-2 right-2 cursor-pointer rounded-lg bg-red-400 p-1 text-red-100 transition-colors duration-300 hover:bg-red-500 hover:text-red-800"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.body,
    );
}
