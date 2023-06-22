'use strict';

const {TemplateLiteral} = require('./template-literal');
const maybeDecorators = (path) => {
    if (!path.node.decorators)
        return [];
    
    return path.get('decorators');
};

module.exports = {
    TemplateLiteral,
    BigIntLiteral(path, {write}) {
        write(path.node.raw);
    },
    Decorator(path, {print}) {
        print('@');
        print('__expression');
        print(' ');
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
        const {raw, value} = path.node;
        
        write(raw || `'${value}'`);
    },
    Identifier(path, {write, maybe, traverse}) {
        const {node} = path;
        const {name, optional} = node;
        const parenthesized = node.extra?.parenthesized;
        const typeAnnotation = path.get('typeAnnotation');
        
        maybe.write(parenthesized, '(');
        for (const decorator of maybeDecorators(path)) {
            traverse(decorator);
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
