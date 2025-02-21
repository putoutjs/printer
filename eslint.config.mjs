import {createESLintConfig} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout';

const config = {
    ignores: [
        '**/fixture/*.*',
    ],
};

export default createESLintConfig([safeAlign, config]);
