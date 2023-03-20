'use strict';

const {TemplateLiteral} = require('./template-literal');

module.exports = {
    TemplateLiteral,
    NumericLiteral(path, {print}) {
        const {raw, extra} = path.node;
        print(raw || extra.raw);
    },
    BooleanLiteral(path, {print}) {
        print(path.node.value);
    },
    StringLiteral(path, {print}) {
        const {value} = path.node;
        print(`'${value}'`);
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
};

