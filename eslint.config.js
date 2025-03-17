import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['dist/**'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: true,
                sourceType: 'module'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules
        }
    },
    prettier
];
