'use strict';

const {TemplateLiteral} = require('./template-literal');

module.exports = {
    TemplateLiteral,
    NumericLiteral(path, {print}) {
        const {
            raw,
            extra,
        } = path.node;
        
        print(raw || extra.raw);
    },
    BooleanLiteral(path, {print}) {
        print(path.node.value);
    },
    StringLiteral(path, {print}) {
        const {
            raw,
            value,
        } = path.node;
        
        print(raw || `'${value}'`);
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
    RegExpLiteral(path, {print}) {
        print(path.node.raw);
    },
    NullLiteral(path, {print}) {
        print('null');
    },
};
