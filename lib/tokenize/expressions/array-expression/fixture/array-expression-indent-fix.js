'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.include = () => [
    'TSTypeParameterDeclaration',
    'TSTypeAnnotation',
];
