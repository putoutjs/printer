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
            value,
        } = path.node;
        
        write(raw || extra?.raw || value);
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
        const {node} = path;
        const parenthesized = node.extra?.parenthesized;
        
        const {
            name,
            optional,
        } = node;
        
        maybe.write(parenthesized, '(');
        write(name);
        maybe.write(optional, '?');
        print('__typeAnnotation');
        maybe.write(parenthesized, ')');
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
