'use strict';

const {isNext} = require('../is');
const {TSTypeLiteral} = require('./type/ts-type-literal');
const {TSTypeAliasDeclaration} = require('./type/ts-type-alias-declaration');
const {TSMappedType} = require('./mapped-type/ts-mapped-type');
const {TSConditionalType} = require('./ts-conditional-type');
const {TSTypeParameter} = require('./type/ts-type-parameter');
const {TSDeclareFunction} = require('./function/ts-declare-function');
const {TSDeclareMethod} = require('./function/ts-declare-method');

const {
    TSModuleDeclaration,
    TSModuleBlock,
} = require('./namespace/ts-module-declaration');

const {TSInterfaceDeclaration} = require('./interface/ts-interface-declaration');
const {TSAsExpression} = require('./ts-as-expression/ts-as-expression');
const {TSInterfaceBody} = require('./interface/ts-interface-body');
const {TSIntersectionType} = require('./ts-intersection-type');
const {TSPropertySignature} = require('./ts-property-signature/ts-property-signature');
const {TSFunctionType} = require('./function/ts-function-type');
const {printParams} = require('../expressions/function/params');
const {TSEnumDeclaration} = require('./enum/ts-enum-declaration');
const {TSEnumMember} = require('./enum/ts-enum-member');
const {TSTupleType} = require('./tuple/ts-tuple-type');
const {TSNamedTupleMember} = require('./tuple/ts-named-tuple-member');
const {TSConstructorType} = require('./function/ts-constructor-type');
const {TSCallSignatureDeclaration} = require('./function/ts-call-signature-declaration');
const {TSConstructSignatureDeclaration} = require('./function/ts-construct-signature-declaration');
const {TSMethodSignature} = require('./function/ts-method-signature');

const {
    maybeParenOpen,
    maybeParenClose,
} = require('../expressions/unary-expression/parens');

const {maybePrintTypeAnnotation} = require('../maybe/maybe-type-annotation');
const {TSImportType} = require('./ts-import-type');
const {TSExportAssignment} = require('./ts-export-assignment/ts-export-assignment');
const {TSTypeReference} = require('./ts-type-reference/ts-type-reference');
const {TSInferType} = require('./ts-infer-type/ts-infert-type');

module.exports = {
    TSAsExpression,
    TSExportAssignment,
    TSTypeLiteral,
    TSTypeAliasDeclaration,
    TSTypeParameter,
    TSMappedType,
    TSConditionalType,
    TSDeclareFunction,
    TSModuleDeclaration,
    TSModuleBlock,
    TSIntersectionType,
    TSImportType,
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
    TSInferType,
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
    TSArrayType(path, {print}) {
        print('__elementType');
        print('[]');
    },
    TSTypeReference,
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
    TSUndefinedKeyword(path, {write}) {
        write('undefined');
    },
    TSBooleanKeyword(path, {write}) {
        write('boolean');
    },
    TSSatisfiesExpression(path, {print}) {
        print('__expression');
        print(' satisfies ');
        print('__typeAnnotation');
    },
    TSUnionType(path, printer) {
        const {traverse, write} = printer;
        
        const types = path.get('types');
        const n = types.length - 1;
        
        maybeParenOpen(path, printer);
        
        for (const [i, type] of types.entries()) {
            traverse(type);
            
            if (i < n) {
                write.space();
                write('|');
                write.space();
            }
        }
        
        maybeParenClose(path, printer);
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
        print('__typeAnnotation');
    },
    TSConstructSignatureDeclaration,
    TSIndexSignature(path, printer) {
        const {print} = printer;
        print('[');
        print('__parameters.0');
        print(']');
        maybePrintTypeAnnotation(path, printer);
        print(';');
        print.newline();
    },
    TSClassImplements(path, {print}) {
        print('__expression');
        print('__typeParameters');
    },
    TSInterfaceHeritage(path, {print}) {
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
        maybe.print(path.node.isExport, 'export ');
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
    TSMethodSignature,
    TSCallSignatureDeclaration,
    TSThisType(path, {print}) {
        print('this');
    },
};
