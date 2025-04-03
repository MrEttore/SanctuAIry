import { Model } from '../types/llm';

export const models: Model[] = [
  {
    name: 'SanctuAIry 1.0 - 3B',
    description:
      'A balanced general-purpose model fine-tuned for helpfulness and clarity.',
    imageSource:
      'https://hub.docker.com/repository/docker/sanctuairy/llm-core/general',
  },
  {
    name: 'Llama 3.2 - 3B',
    description:
      'Optimized for reasoning and long-form answers — great for complex queries.',
    imageSource: 'https://huggingface.co/meta-llama/Llama-3.2-3B',
  },
  {
    name: 'Llama 3.1 - 8B',
    description:
      'Fast and lightweight — ideal for quick responses and everyday tasks.',
    imageSource: 'https://huggingface.co/meta-llama/Llama-3.1-8B',
  },
];
