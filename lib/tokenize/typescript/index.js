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

const {TSInterfaceDeclaration} = require('./interface/ts-interface-declaration');
const {TSAsExpression} = require('./ts-as-expression');
const {TSInterfaceBody} = require('./interface/ts-interface-body');
const {TSIntersectionType} = require('./ts-intersection-type');
const {TSPropertySignature} = require('./ts-property-signature');
const {TSFunctionType} = require('./ts-function-type');
const {printParams} = require('../expressions/functions/params');

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
    TSIntersectionType,
    TSBigIntKeyword(path, {write}) {
        write('bigint');
    },
    TSNullKeyword(path, {write}) {
        write('null');
    },
    TSSymbolKeyword(path, {write}) {
        write('symbol');
    },
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
    TSObjectKeyword(path, {write}) {
        write('object');
    },
    TSLiteralType(path, {print}) {
        print('__literal');
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
    TSTypeParameterDeclaration(path, printer, semantics) {
        printParams(path, printer, semantics, {
            braceOpen: '<',
            braceClose: '>',
        });
    },
    TSTypeParameterInstantiation(path, printer, semantics) {
        printParams(path, printer, semantics, {
            braceOpen: '<',
            braceClose: '>',
        });
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
    TSInterfaceBody,
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
    TSConstructSignatureDeclaration(path, {write, traverse, maybe}) {
        write('new');
        write('(');
        
        const params = path.get('parameters');
        const n = params.length - 1;
        
        for (const [index, param] of params.entries()) {
            traverse(param);
            maybe.write(index < n, ',');
            maybe.write.space(index < n);
        }
        
        write(')');
        const typeAnnotation = path.get('typeAnnotation');
        
        if (exists(typeAnnotation)) {
            write(':');
            write.space();
            traverse(typeAnnotation);
        }
    },
    TSIndexSignature(path, {print}) {
        print('[');
        print('__parameters.0');
        print(']');
        print(':');
        print.space();
        print('__typeAnnotation');
    },
    TSCallSignatureDeclaration(path, {print}) {
        print('(');
        print('__parameters.0');
        print(')');
        print(':');
        print.space();
        print('__typeAnnotation');
    },
    TSMethodSignature(path, {traverse, write, maybe}) {
        traverse(path.get('key'));
        write('(');
        
        const params = path.get('parameters');
        const n = params.length - 1;
        
        for (const [index, param] of params.entries()) {
            traverse(param);
            maybe.write(index < n, ',');
            maybe.write.space(index < n);
        }
        
        write(')');
        
        const typeAnnotation = path.get('typeAnnotation');
        
        if (exists(typeAnnotation)) {
            write(':');
            write.space();
            traverse(typeAnnotation);
        }
    },
    TSExpressionWithTypeArguments(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
    TSPropertySignature,
    TSFunctionType,
};

