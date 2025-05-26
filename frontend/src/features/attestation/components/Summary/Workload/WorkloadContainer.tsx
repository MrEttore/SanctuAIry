import { Container as ContainerIcon, ScanSearch } from 'lucide-react';

import { ModalType } from '../../../../../types/ui';
import { Container } from '../../../types/attestation';

type Props = {
    container: Container;
    onInspect: (modalType: ModalType, containerId?: string) => void;
};

export function WorkloadContainer({ container, onInspect }: Props) {
    return (
        <div className="rounded-lg px-1.5 py-2 bg-teal-800/20 shadow-xs flex flex-1 justify-between">
            <div className="flex items-center">
                <ContainerIcon className="mr-3" />
                <div className="flex flex-col">
                    <p className="text-base">
                        Name:
                        <span className="ml-1 font-semibold">
                            {container.name}
                        </span>
                    </p>
                    <p className="text-sm">
                        Image:
                        <span className="ml-1 font-semibold">
                            {container.image}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="flex items-center gap-1 rounded-lg px-1.5 text-sm py-1 font-medium cursor-pointer bg-teal-800/80 text-teal-50 transition-all duration-400 shadow-sm hover:bg-teal-800"
                    onClick={() =>
                        onInspect(ModalType.VIEW_CONTAINER, container.id)
                    }
                >
                    <ScanSearch size={14} />
                    Inspect
                </button>
            </div>
        </div>
    );
}
