'use strict';

const {exists, isNext} = require('../is');
const {TSTypeLiteral} = require('./ts-type-literal');
const {TSTypeAliasDeclaration} = require('./ts-type-alias-declaration');
const {TSMappedType} = require('./ts-mapped-type');
const {TSConditionalType} = require('./ts-conditional-type');
const {TSTypeParameter} = require('./ts-type-parameter');
const {TSDeclareFunction} = require('./function/ts-declare-function');
const {TSDeclareMethod} = require('./function/ts-declare-method');

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
const {TSEnumDeclaration} = require('./enum/ts-enum-declaration');
const {TSEnumMember} = require('./enum/ts-enum-member');
const {TSTupleType} = require('./tuple/ts-tuple-type');
const {TSNamedTupleMember} = require('./tuple/ts-named-tuple-member');
const {TSConstructorType} = require('./ts-constructor-type');

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
    TSTupleType,
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
    TSConstructSignatureDeclaration(path, printer, semantics) {
        const {write, traverse} = printer;
        
        write('new');
        printParams(path, printer, semantics, {
            params: path.get('parameters'),
        });
        
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
    TSMethodSignature(path, printer, semantics) {
        const {traverse, write} = printer;
        
        traverse(path.get('key'));
        printParams(path, printer, semantics, {
            params: path.get('parameters'),
        });
        
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
    TSTypePredicate(path, {print}) {
        print('__parameterName');
        print(' is ');
        print('__typeAnnotation');
    },
    TSNonNullExpression(path, {print}) {
        print('__expression');
        print('!');
    },
    TSEnumDeclaration,
    TSEnumMember,
    TSImportEqualsDeclaration(path, {print, maybe}) {
        print('import ');
        print('__id');
        print.space();
        print('=');
        print.space();
        print('__moduleReference');
        print(';');
        maybe.print.newline(isNext(path));
    },
    TSExternalModuleReference(path, {print}) {
        print('require(');
        print('__expression');
        print(')');
    },
    TSDeclareMethod,
    TSNamedTupleMember,
    TSConstructorType,
};
