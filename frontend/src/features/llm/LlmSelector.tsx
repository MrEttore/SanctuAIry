import { useQuery } from '@tanstack/react-query';
import {
    ChevronDown,
    ChevronUp,
    CircleX,
    Info,
    LoaderCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getModel, selectModel } from '../../redux/slices/chatSlice';
import { getModels } from '../../services/llmManager';
import { Model } from '../../types/llm';

export function LlmSelector() {
    const [isOpen, setIsOpen] = useState(false);

    const model = useSelector(getModel);

    const dispatch = useDispatch();

    const {
        isPending,
        isError,
        data: payload,
        error,
    } = useQuery({
        queryKey: ['llm-models'],
        queryFn: getModels,
    });

    const models: Model[] = payload?.data.models;

    function handleSelectModel(model: Model) {
        dispatch(selectModel(model));
        setIsOpen(false);
    }

    if (isPending)
        return (
            <span className="flex w-1/6 items-center px-4 py-2 text-xl text-teal-50">
                <LoaderCircle className="mr-2 animate-spin" />
                Loading
            </span>
        );

    if (isError)
        return (
            <span className="flex items-center self-center rounded-xl bg-red-700/60 px-4 py-2 text-teal-50">
                <CircleX className="mr-2" />
                {error.message}
            </span>
        );

    return (
        <div className="relative inline-block self-center text-left">
            <button
                className="inline-flex cursor-pointer items-center justify-center space-x-2 rounded-xl bg-teal-800 px-4 py-2 text-teal-50 transition-all duration-300 hover:bg-teal-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronDown /> : <ChevronUp />}
                <span className="text-xl">
                    {model?.name ?? 'Select a model to start'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-6 w-96 overflow-hidden rounded-xl bg-teal-900 py-2 shadow-md">
                    {!models.length && (
                        <p className="px-4 py-2 text-teal-50">
                            No models available
                        </p>
                    )}
                    <ul className="text-teal-50">
                        {models.map((model) => (
                            <li key={model.name}>
                                <button
                                    className="w-full cursor-pointer px-4 py-2 text-left hover:bg-teal-800 focus:ring-1 focus:outline-none"
                                    onClick={() => handleSelectModel(model)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="space-x-2">
                                            <span className="text-xl">
                                                {model.name}
                                            </span>
                                            <span className="text-md">
                                                {model.details.parameter_size}
                                            </span>
                                        </div>
                                        <div
                                            className="cursor-pointer rounded-full p-2 hover:bg-teal-900/50 focus:ring-1 focus:outline-none"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() =>
                                                window.open(
                                                    model.imageSource, // TODO: Add image source link.
                                                    '_blank',
                                                    'noreferrer',
                                                )
                                            }
                                        >
                                            <Info size={20} />
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
