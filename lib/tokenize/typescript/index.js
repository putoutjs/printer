'use strict';

const {exists} = require('../is');
const {TSTypeLiteral} = require('./ts-type-literal');
const {TSTypeAliasDeclaration} = require('./ts-type-alias-declaration');
const {TSMappedType} = require('./ts-mapped-type');
const {TSConditionalType} = require('./ts-conditional-type');
const {TSTypeParameter} = require('./ts-type-parameter');
const {TSDeclareFunction} = require('./ts-declare-function');

const {
    TSModuleDeclaration,
    TSModuleBlock,
} = require('./ts-module-declaration');

const {TSInterfaceDeclaration} = require('./ts-interface-declaration');
const {TSAsExpression} = require('./ts-as-expression');

module.exports = {
    TSAsExpression,
    TSTypeLiteral,
    TSTypeAliasDeclaration,
    TSTypeParameter,
    TSMappedType,
    TSConditionalType,
    TSDeclareFunction,
    TSModuleDeclaration,
    TSModuleBlock,
    TSTypeQuery(path, {print}) {
        print('typeof ');
        print('__exprName');
    },
    TSNeverKeyword(path, {write}) {
        write('never');
    },
    TSUnknownKeyword(path, {write}) {
        write('unknown');
    },
    TSTupleType(path, {write, traverse, maybe}) {
        const elementTypes = path.get('elementTypes');
        const n = elementTypes.length - 1;
        
        write('[');
        
        for (const [i, elementType] of elementTypes.entries()) {
            traverse(elementType);
            maybe.write(i < n, ', ');
        }
        
        write(']');
    },
    TSInferType(path, {print}) {
        print('infer ');
        print('__typeParameter');
    },
    TSRestType(path, {print}) {
        print('...');
        print('__typeAnnotation');
    },
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
    TSTypeOperator(path, {write, print}) {
        const {operator} = path.node;
        write(`${operator} `);
        print('__typeAnnotation');
    },
    TSInterfaceDeclaration,
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
