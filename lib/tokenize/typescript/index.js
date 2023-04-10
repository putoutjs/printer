'use strict';

const {exists} = require('../is');
const {TSTypeLiteral} = require('./ts-type-literal');

module.exports = {
    TSTypeLiteral,
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
    },
    TSTypeParameter(path, {write}) {
        write(path.node.name);
    },
    TSNumberKeyword(path, {write}) {
        write('number');
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
    TSTypeAliasDeclaration(path, {print}) {
        print('type ');
        print('__id');
        print.space();
        print('=');
        print.space();
        print('__typeAnnotation');
        print(';');
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
