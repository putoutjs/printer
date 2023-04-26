'use strict';

const {TemplateLiteral} = require('./template-literal');

module.exports = {
    TemplateLiteral,
    BigIntLiteral(path, {write}) {
        write(path.node.raw);
    },
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
    Identifier(path, {write, print, maybe}) {
        const {
            name,
            optional,
        } = path.node;
        
        write(name);
        maybe.write(optional, '?');
        print('__typeAnnotation');
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
    Import(path, {write}) {
        write('import');
    },
    Super(path, {write}) {
        write('super');
    },
};
