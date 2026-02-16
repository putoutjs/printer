import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';
import {matchToFlat} from '@putout/eslint-flat';

export const match = {
    '**/*.errors.ts': {
        '@typescript-eslint/no-unused-vars': 'off',
    },
};

export default defineConfig([
    safeAlign,
    matchToFlat(match), {
        ignores: ['**/fixture'],
    },
]);
