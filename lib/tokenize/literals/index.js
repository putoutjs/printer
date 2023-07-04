'use strict';

const {TemplateLiteral} = require('./template-literal');
const {maybeDecorators} = require('../maybe-get');

module.exports = {
    TemplateLiteral,
    BigIntLiteral(path, {write}) {
        write(path.node.raw);
    },
    Decorator(path, {print}) {
        print('@');
        print('__expression');
    },
    NumericLiteral(path, {write}) {
        const {
            raw,
            extra,
            value,
        } = path.node;
        
        write(raw || extra?.raw || value);
    },
    Directive(path, {print}) {
        print('__value');
    },
    DirectiveLiteral(path, {write}) {
        write.indent();
        write(path.node.raw);
        write(';');
        write.newline();
    },
    BooleanLiteral(path, {write}) {
        write(path.node.value);
    },
    StringLiteral(path, {write}) {
        const {raw, value} = path.node;
        
        write(raw || `'${value}'`);
    },
    Identifier(path, {write, maybe, traverse, print}) {
        const {node} = path;
        const {name, optional} = node;
        const parenthesized = node.extra?.parenthesized;
        const typeAnnotation = path.get('typeAnnotation');
        
        maybe.write(parenthesized, '(');
        for (const decorator of maybeDecorators(path)) {
            traverse(decorator);
            print(' ');
        }
        
        write(name);
        maybe.write(optional, '?');
        traverse(typeAnnotation);
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
