'use strict';

const {TemplateLiteral} = require('./template-literal');

module.exports = {
    TemplateLiteral,
    NumericLiteral(path, {write}) {
        const {extra, raw} = path.node;
        write(raw || extra.raw);
    },
    BooleanLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral(path, {write}) {
        const {value} = path.node;
        write(`'${value}'`);
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
};
