'use strict';

const {exists} = require('../is');
const {TSTypeLiteral} = require('./ts-type-literal');
const {TSTypeAliasDeclaration} = require('./ts-type-alias-declaration');
const {TSMappedType} = require('./ts-mapped-type');

module.exports = {
    TSTypeLiteral,
    TSTypeAliasDeclaration,
    TSMappedType,
    TSTypeParameterDeclaration(path, {print}) {
        print('<');
        
        path
            .get('params')
            .forEach(print);
        
        print('>');
    },
    TSTypeParameterInstantiation(path, {print}) {
        print('<');
        
        path
            .get('params')
            .forEach(print);
        
        print('>');
    },
    TSTypeReference(path, {print}) {
        print('__typeName');
        print('__typeParameters');
    },
    TSArrayType(path, {print}) {
        print('__elementType');
        print('[]');
    },
    TSTypeParameter(path, {write, traverse}) {
        const constraint = path.get('constraint');
        
        if (path.node.in)
            write('in ');
        else if (path.node.out)
            write('out ');
        
        write(path.node.name);
        
        if (exists(constraint)) {
            write(' in ');
            traverse(constraint);
        }
    },
    TSTypeOperator(path, {write, print}) {
        const {operator} = path.node;
        write(`${operator} `);
        print('__typeAnnotation');
    },
    TSInterfaceDeclaration(path, {print}) {
        print('interface ');
        print('__id');
        print('__body');
    },
    TSInterfaceBody(path, {traverse, write, indent}) {
        write(' {');
        write.newline();
        indent.inc();
        
        for (const item of path.get('body')) {
            indent();
            traverse(item);
            write(';');
            write.newline();
        }
        
        indent.dec();
        write('}');
    },
    TSTypeAssertion(path, {print}) {
        print('<');
        print('__typeAnnotation');
        print('>');
        print('__expression');
    },
    TSAsExpression(path, {print}) {
        print('__expression');
        print(' as ');
        print('__typeAnnotation');
    },
    TSParenthesizedType(path, {print}) {
        print('(');
        print('__typeAnnotation');
        print(')');
    },
    TSUndefinedKeyword(path, {write}) {
        write('undefined');
    },
    TSBooleanKeyword(path, {write}) {
        write('boolean');
    },
    TSUnionType(path, {traverse, write}) {
        const types = path.get('types');
        const n = types.length - 1;
        
        for (const [i, type] of types.entries()) {
            traverse(type);
            
            if (i < n) {
                write.space();
                write('|');
                write.space();
            }
        }
    },
    TSNumberKeyword(path, {write}) {
        write('number');
    },
    TSIndexedAccessType(path, {print}) {
        print('__objectType');
        print('[');
        print('__indexType');
        print(']');
    },
    TSStringKeyword(path, {write}) {
        write('string');
    },
    TSInstantiationExpression(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
    TSAnyKeyword(path, {write}) {
        write('any');
    },
    TSVoidKeyword(path, {write}) {
        write('void');
    },
    TSFunctionType(path, {print}) {
        print('(');
        print(')');
        print.space();
        print('=>');
        print.space();
        print('__typeAnnotation');
    },
    TSQualifiedName(path, {print}) {
        print('__left');
        print('.');
        print('__right');
    },
    TSParameterProperty(path, {write, print}) {
        write(path.node.accessibility);
        write.space();
        print('__parameter');
    },
    TSTypeAnnotation(path, {print}) {
        if (path.parentPath.isIdentifier()) {
            print(':');
            print.space();
        }
        
        print('__typeAnnotation');
    },
    TSExpressionWithTypeArguments(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
    TSPropertySignature(path, {print, maybe, traverse}) {
        const {optional} = path.node;
        const typeAnnotation = path.get('typeAnnotation');
        
        print('__key');
        maybe.print(optional, '?');
        
        if (exists(typeAnnotation)) {
            print(':');
            print.space();
            traverse(typeAnnotation);
        }
    },
};
