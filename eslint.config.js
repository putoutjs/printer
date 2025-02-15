'use strict';

const {createESLintConfig} = require('@putout/eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');
const config = {
    ignores: [
        '**/fixture/*.*',
    ],
};

module.exports = createESLintConfig([safeAlign, config]);
