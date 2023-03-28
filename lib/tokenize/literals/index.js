'use strict';

const {TemplateLiteral} = require('./template-literal');

module.exports = {
    TemplateLiteral,
    NumericLiteral(path, {write}) {
        const {
            raw,
            extra,
        } = path.node;
        
        write(raw || extra.raw);
    },
    BooleanLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral(path, {write}) {
        const {
            raw,
            value,
        } = path.node;
        
        write(raw || `'${value}'`);
    },
    Identifier(path, {write}) {
        write(path.node.name);
    },
    RegExpLiteral(path, {print}) {
        print(path.node.raw);
    },
    NullLiteral(path, {write}) {
        write('null');
    },
    MetaProperty(path, {write}) {
        write('import.meta');
    },
};
