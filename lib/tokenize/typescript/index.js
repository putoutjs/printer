'use strict';

const {exists} = require('../is');
const {TSTypeLiteral} = require('./ts-type-literal');
const {TSTypeAliasDeclaration} = require('./ts-type-alias-declaration');

module.exports = {
    TSTypeLiteral,
    TSTypeAliasDeclaration,
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

