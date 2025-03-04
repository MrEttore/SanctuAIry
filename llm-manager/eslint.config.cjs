import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-modules': 'off',
      'perfectionist/sort-union-types': 'off',
      'perfectionist/sort-named-imports': 'off',
    },
    ignores: ['**/*.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
  },
);
