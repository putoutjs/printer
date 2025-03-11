import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

const config = {
    ignores: [
        '**/fixture/*.*',
    ],
};

export default defineConfig([safeAlign, config]);
