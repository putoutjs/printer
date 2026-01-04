import {isNext} from '#is';
import {printParams} from '../expressions/function/params.js';
import {maybePrintTypeAnnotation} from '../maybe/maybe-type-annotation.js';

export {TSTypeLiteral} from './type/ts-type-literal.js';
export {TSTypeAliasDeclaration} from './type/ts-type-alias-declaration.js';
export {TSMappedType} from './mapped-type/ts-mapped-type.js';
export {TSConditionalType} from './ts-conditional-type.js';
export {TSTypeParameter} from './type/ts-type-parameter.js';
export {TSDeclareFunction} from './function/ts-declare-function.js';
export {TSDeclareMethod} from './function/ts-declare-method.js';
export {TSModuleDeclaration, TSModuleBlock} from './namespace/ts-module-declaration.js';
export {TSInterfaceDeclaration} from './interface/ts-interface-declaration.js';
export {TSAsExpression} from './ts-as-expression/ts-as-expression.js';
export {TSInterfaceBody} from './interface/ts-interface-body.js';
export {TSIntersectionType} from './ts-intersection-type.js';
export {TSPropertySignature} from './ts-property-signature/ts-property-signature.js';
export {TSFunctionType} from './function/ts-function-type.js';
export {TSEnumDeclaration} from './enum/ts-enum-declaration.js';
export {TSEnumMember} from './enum/ts-enum-member.js';
export {TSTupleType} from './tuple/ts-tuple-type.js';
export {TSNamedTupleMember} from './tuple/ts-named-tuple-member.js';
export {TSConstructorType} from './function/ts-constructor-type.js';
export {TSCallSignatureDeclaration} from './function/ts-call-signature-declaration.js';
export {TSConstructSignatureDeclaration} from './function/ts-construct-signature-declaration.js';
export {TSMethodSignature} from './function/ts-method-signature.js';
export {TSUnionType} from './ts-union-type/ts-union-type.js';
export {TSImportType} from './ts-import-type/ts-import-type.js';
export {TSExportAssignment} from './ts-export-assignment/ts-export-assignment.js';
export {TSTypeReference} from './ts-type-reference/ts-type-reference.js';
export {TSInferType} from './ts-infer-type/ts-infer-type.js';
export {TSParameterProperty} from './ts-parameter-property/ts-parameter-property.js';
export {TSTypeParameterDeclaration} from './ts-type-parameter-declaration/ts-type-parameter-declaration.js';
export {TSTypeQuery} from './ts-type-query/ts-type-query.js';
export {TSParenthesizedType} from './ts-parenthesized-type/ts-parenthesized-type.js';
export {TSTemplateLiteralType} from './ts-template-literal-type/ts-template-literal-type.js';
export {TSOptionalType} from './ts-optional-type/ts-optional-type.js';

export const TSBigIntKeyword = (path, {write}) => {
    write('bigint');
};
export const TSNullKeyword = (path, {write}) => {
    write('null');
};
export const TSSymbolKeyword = (path, {write}) => {
    write('symbol');
};
export const TSNeverKeyword = (path, {write}) => {
    write('never');
};
export const TSUnknownKeyword = (path, {write}) => {
    write('unknown');
};
export const TSObjectKeyword = (path, {write}) => {
    write('object');
};
export const TSLiteralType = (path, {print}) => {
    print('__literal');
};
export const TSRestType = (path, {print}) => {
    print('...');
    print('__typeAnnotation');
};
export const TSTypeParameterInstantiation = (path, printer, semantics) => {
    printParams(path, printer, semantics, {
        braceOpen: '<',
        braceClose: '>',
    });
};
export const TSArrayType = (path, {print}) => {
    print('__elementType');
    print('[]');
};
export const TSTypeOperator = (path, {write, print}) => {
    const {operator} = path.node;
    write(`${operator} `);
    print('__typeAnnotation');
};
export const TSTypeAssertion = (path, {print}) => {
    print('<');
    print('__typeAnnotation');
    print('>');
    print('__expression');
};
export const TSUndefinedKeyword = (path, {write}) => {
    write('undefined');
};
export const TSBooleanKeyword = (path, {write}) => {
    write('boolean');
};
export const TSSatisfiesExpression = (path, {print}) => {
    print('__expression');
    print(' satisfies ');
    print('__typeAnnotation');
};
export const TSNumberKeyword = (path, {write}) => {
    write('number');
};
export const TSIndexedAccessType = (path, {print}) => {
    print('__objectType');
    print('[');
    print('__indexType');
    print(']');
};
export const TSStringKeyword = (path, {write}) => {
    write('string');
};
export const TSInstantiationExpression = (path, {print}) => {
    print('__expression');
    print('__typeArguments');
};
export const TSAnyKeyword = (path, {write}) => {
    write('any');
};
export const TSVoidKeyword = (path, {write}) => {
    write('void');
};
export const TSQualifiedName = (path, {print}) => {
    print('__left');
    print('.');
    print('__right');
};
export const TSTypeAnnotation = (path, {print}) => {
    print('__typeAnnotation');
};

export const TSIndexSignature = (path, printer) => {
    const {print} = printer;
    print('[');
    print('__parameters.0');
    print(']');
    maybePrintTypeAnnotation(path, printer);
    print(';');
    print.newline();
};

export const TSClassImplements = (path, {print}) => {
    print('__expression');
    print('__typeArguments');
};

export const TSInterfaceHeritage = (path, {print}) => {
    print('__expression');
    print('__typeArguments');
};

export const TSTypePredicate = (path, {print}) => {
    print('__parameterName');
    print(' is ');
    print('__typeAnnotation');
};

export const TSNonNullExpression = (path, {print}) => {
    print('__expression');
    print('!');
};

export const TSImportEqualsDeclaration = (path, {print, maybe}) => {
    maybe.print(path.node.isExport, 'export ');
    print('import ');
    print('__id');
    print.space();
    print('=');
    print.space();
    print('__moduleReference');
    print(';');
    maybe.print.newline(isNext(path));
};
export const TSExternalModuleReference = (path, {print}) => {
    print('require(');
    print('__expression');
    print(')');
};

export const TSThisType = (path, {print}) => {
    print('this');
};
