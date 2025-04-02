import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import { useState } from 'react';

const options = [
  {
    name: 'SanctuAIry 1.0',
    description:
      'A balanced general-purpose model fine-tuned for helpfulness and clarity.',
  },
  {
    name: 'Llama 3.2',
    description:
      'Optimized for reasoning and long-form answers — great for complex queries.',
  },
  {
    name: 'Llama 3.1',
    description:
      'Fast and lightweight — ideal for quick responses and everyday tasks.',
  },
];

export default function ChatHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState(options[0].name);

  const handleSetModel = (modelName: string) => {
    setModel(modelName);
    setIsOpen(false);
  };

  return (
    <header className="flex bg-teal-900 p-3">
      <div className="relative inline-block text-left">
        <button
          className="inline-flex cursor-pointer items-center justify-center space-x-2 rounded-xl px-4 py-2 text-2xl text-teal-50 transition-all duration-300 hover:bg-teal-800 hover:font-medium"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown /> : <ChevronUp />}
          <span>{model}</span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-4 w-96 overflow-hidden rounded-xl bg-teal-900 py-2 shadow-md">
            <ul className="text-teal-50">
              {options.map((option) => (
                <li>
                  <button
                    className="w-full cursor-pointer px-4 py-2 text-left hover:bg-teal-800"
                    onClick={() => handleSetModel(option.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-semibold">
                          {option.name}
                        </span>
                        <p className="mt-2">{option.description}</p>
                      </div>
                      <button className="cursor-pointer rounded-full p-2 hover:bg-teal-900/50">
                        <Info size={20} />
                      </button>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
