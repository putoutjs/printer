'use strict';

const {
    operator,
    types,
    template,
} = require('putout');

const {compare, getTemplateValues} = operator;

const {isBlockStatement} = types;

module.exports.report = () => `Use 'for...of' instead of 'for'`;

const forLoop = 'for (let __i = 0; __i < __e.length; __i++) __c';
const getForOfLoop = template(`for (const LEFT of RIGHT) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignIterableWithName = (__i, __e) => `const __a = ${__e.name}[${__i.name}]`;

module.exports.filter = (path) => {};