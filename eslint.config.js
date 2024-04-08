'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');
const config = {
    ignores: [
        '**/fixture/*.*',
    ],
};

module.exports = [
    ...safeAlign,
    config,
];
